import { InventoryRepository } from "../repositories/inventory-repository"
import { TransactionInventoryRepository } from "../repositories/inventory-transaction-repository"


interface InventoryTendencyRequest {
    from: Date
    to: Date
}

export class InventoryTendencyReportUseCase {
    constructor(
        private inventoryRepository: InventoryRepository,
        private transacationInventoryRepository: TransactionInventoryRepository
    ) {}


    async execute({ from, to }: InventoryTendencyRequest) {
        const transactions = await this.transacationInventoryRepository.searchTransactionFromPeriod(from , to)
        


    }
}