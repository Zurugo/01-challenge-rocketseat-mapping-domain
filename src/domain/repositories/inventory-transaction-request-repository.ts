import { RequestTransactionInventory } from "../entities/inventory-transaction-request"


export interface RequestTransactionInventoryRepository {
    create(requestTransactionInventory: RequestTransactionInventory): Promise<void>
}