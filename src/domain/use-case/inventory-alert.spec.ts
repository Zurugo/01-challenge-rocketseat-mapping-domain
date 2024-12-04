import { InventoryAlertUseCase } from "./inventory-alert"
import { InventoryRepository } from "../repositories/inventory-repository"
import { Inventory } from "../entities/inventory"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { MinimumInventory } from "../entities/value-objects/minimum-inventory-quantity"

const product = Inventory.create({
    productId: new UniqueEntityID('1'),
    minInventory: new MinimumInventory(3),
    quantity: 3,
    unitPrice: 5
})

const fakeInventoryRepository: InventoryRepository = {
    getProduct: async (productId: string) => {
        if (productId === String(product.productId)) {
            return product
        }
        return null
    }
}

test('Verify inventory minimum item', async () => {
    const instanceInventory = new InventoryAlertUseCase(fakeInventoryRepository)

    const alertStock = await instanceInventory.execute({
        productId: '1'
    })

    expect(alertStock).toEqual('The minimum quantity this product is less than minimum register')
})