import { Sale } from "../entities/sales"

export interface SalesRespository {
    create(sale: Sale): Promise<void>
    searchSalesFromPeriod(from: Date, to: Date): Promise<Sale[] | null>
}