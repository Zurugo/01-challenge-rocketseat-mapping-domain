import { InventoryRepository } from "../repositories/inventory-repository"
import { MinimumInventory } from "../entities/value-objects/minimum-inventory-quantity"

interface InventoryAlertRequest {
    productId: string
}

export class InventoryAlertUseCase {
    constructor(
        private inventoryRepository: InventoryRepository
    ) {}

    async execute({ productId }: InventoryAlertRequest) {
        const productInventory = await this.inventoryRepository.getProduct(productId)
    
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