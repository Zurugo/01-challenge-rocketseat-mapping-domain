import { SalesRespository } from "../repositories/sale-repository"

interface SalesReportRequest {
    from: Date
    to: Date
}

export class SalesReportUseCase {
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