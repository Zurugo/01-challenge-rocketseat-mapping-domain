import { Sale } from "../entities/sales"

export interface SalesRespository {
    create(sale: Sale): Promise<void>
}