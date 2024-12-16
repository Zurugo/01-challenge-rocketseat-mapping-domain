import { TransactionInventory } from "../entities/inventory-transaction"

interface InventoryTendencyReport {
    productId: string
    period: Date
    transaction_type: 'INBOUND' | 'OUTBOUND'
    previous_balance: number
    current_balance: number
}

export interface TransactionInventoryRepository {
    create(requestTransactionInventory: TransactionInventory): Promise<void>
    searchTransactionFromPeriod(from: Date, to: Date): Promise<InventoryTendencyReport[] | null>
}