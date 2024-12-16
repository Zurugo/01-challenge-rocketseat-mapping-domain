import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { TransactionInventory } from "../entities/inventory-transaction"


export interface TransactionInventoryRepository {
    create(requestTransactionInventory: TransactionInventory): Promise<void>
    searchTransactionFromPeriod(from: Date, to: Date): Promise<TransactionInventory[] | null>
}