import { SalesRespository } from "../repositories/sale-repository"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { ProductRepository } from "../repositories/product-repository"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"

interface ProductProfitReportRequest {
    from: Date
    to: Date
}

type Product = {
    productId: UniqueEntityID;  // ID do produto, de um tipo específico
    quantity: number;           // Quantidade do produto
    subTotal: number;           // Subtotal do produto
  };
export class ProductProfitReportUseCase {
    constructor (
        private salesRepository: SalesRespository,
        private purchaseOrderRepository: PurchaseOrderRepository
    ) {}

    async execute({ from, to }: ProductProfitReportRequest) {
        const salesPeriod = await this.salesRepository.searchSalesFromPeriod(from, to)

        if (salesPeriod?.length === 0) {
            return 'Sales not found for this period'
        }

        if (!salesPeriod) {
            return
        }

        const products = await Promise.all(
            salesPeriod.map(async (sale) => {
                const product = await this.purchaseOrderRepository.getProductId(sale.purhcaseOrderId.toString())
                return product
            })
        )

        const flattenedProductIds = products.flat()

        console.log(flattenedProductIds)

        const profitProducts = await Promise.all(
            flattenedProductIds.map(async (productId) => {
                return this.purchaseOrderRepository.getProfitProduct(productId.toString())
            })
        )

        const consolidated = profitProducts.reduce<Record<string, { totalQuantity: number; profit: number }>>(
            (acc, product) => {

                if (!product) {
                    return acc
                }

                const { productId, quantity, subTotal } = product;
          
                if (!acc[productId.toString()]) {
                    acc[productId.toString()] = {
                        totalQuantity: 0,
                        profit: 0,
                    };
                }
          
                acc[productId.toString()].totalQuantity += quantity;
                acc[productId.toString()].profit += subTotal;
          
                return acc;
            },
            {} 
        );

        console.log(consolidated)

        const result = Object.entries(consolidated).map(([productId, { totalQuantity, profit }]) => ({
            productId,
            totalQuantity,
            profit,
        }));
        
        return result
    }
}