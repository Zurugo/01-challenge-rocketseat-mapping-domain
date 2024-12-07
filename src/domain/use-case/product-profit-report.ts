import { SalesRespository } from "../repositories/sale-repository"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { ProductRepository } from "../repositories/product-repository"

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

        if (!salesPeriod) {
            return 'Sales not found for this period'
        }

        const profitProducts = salesPeriod.forEach(sale => {
           const productsPurchaseOrder = this.purchaseOrderRepository.getProfitProducts(sale.id)
           return productsPurchaseOrder
        });
        
        return profitProducts        
    }
}