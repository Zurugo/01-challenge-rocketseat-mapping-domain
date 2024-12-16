import { Inventory } from "../entities/inventory"
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

        if (!transactions) {
            return;
        }

        if(transactions.length === 0) {
            return 'No transactions found'
        }

        const inventoryTendencyReports = await Promise.all(
            transactions.map(async (transaction) => {
                const inventoryProps = await this.inventoryRepository.getInventory(transaction.id.toString())

                return {
                    productId: inventoryProps?.productId,
                    period: transaction.createdAt,
                    mov_type: transaction.transactionType,
                    balance: inventoryProps?.quantity,
                    tendency: transaction.quantity

                }
            })
        )
        return inventoryTendencyReports
    }
}