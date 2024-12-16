import { Inventory } from "../entities/inventory"

export interface InventoryRepository {
    getInventory(inventoryId: string): Promise<Inventory | null>
}