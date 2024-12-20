import { MinimumInventory } from "../entities/value-objects/minimum-inventory-quantity"
import { InventoryRepository } from "../repositories/inventory-repository"

interface InventoryAlertRequest {
    productId: string
}

export class InventoryAlertUseCase {
    constructor(
        private inventoryRepository: InventoryRepository
    ) {}

    async execute({ productId }: InventoryAlertRequest) {
        const productInventory = await this.inventoryRepository.getInventory(productId)
    
        if(!productInventory) {
            return 'Product not found in inventory'
        }

        const minimumInventory = productInventory.minInventory.value
          
        const alert = MinimumInventory.verifyInventory(minimumInventory, productInventory.quantity)
    
        if (!alert) {
            return;
        }

        return alert
    }
}