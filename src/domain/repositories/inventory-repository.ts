import { Inventory } from "../entities/inventory"

export interface InventoryRepository {
    getProduct(productId: string): Promise<Inventory | null>
}