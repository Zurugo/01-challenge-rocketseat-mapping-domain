import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Sale } from "../entities/sales"
import { SalesRespository } from "../repositories/sale-repository"


interface SalesReportRequest {
    from: Date
    to: Date
}

export class SalesReport {
    constructor(
        private salesReportRepository: SalesRespository
    ) {}

    async execute({ from, to }: SalesReportRequest) {
        const salesReport = await this.salesReportRepository.searchSalesFromPeriod(from, to)

        if (!salesReport) {
            return 'Sales not found for this period'
        }

        return salesReport
    }
}