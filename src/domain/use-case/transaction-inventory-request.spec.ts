import { TransactionInventory } from "./transaction-inventory-request"
import { RequestTransactionInventoryRepository } from "../repositories/inventory-transaction-request-repository"
import { RequestTransactionInventory } from "../entities/inventory-transaction-request"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"

const fakeRequestTransactionInventory: RequestTransactionInventoryRepository = {
    create: async (transaction: RequestTransactionInventory) => {
        return;
    }
}


test('create a transaction inventory request', async () => {
    const instanceRequestTransactionInventory = new TransactionInventory(fakeRequestTransactionInventory)

    const transaction = await instanceRequestTransactionInventory.execute({
        inventoryId: '1',
        transactionType: 'INBOUND',
        quantity: 3
    })


    expect(transaction).toBeTypeOf('object')
    expect(transaction.id).toEqual(expect.any(UniqueEntityID))
    expect(transaction.transactionType).toEqual('INBOUND')
    expect(transaction.quantity).toEqual(3)

})