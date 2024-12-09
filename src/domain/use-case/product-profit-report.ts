import { SalesRespository } from "../repositories/sale-repository"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { ProductRepository } from "../repositories/product-repository"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"

interface ProductProfitReportRequest {
    from: Date
    to: Date
}

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

        const profitProducts = await Promise.all(
            products.map(async (id) => {
                const profitProducts = await this.purchaseOrderRepository.getProfitProducts(id.toString())
                return profitProducts
            })
        )

        return profitProducts        
    }
}