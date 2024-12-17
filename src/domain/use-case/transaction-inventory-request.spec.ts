import { TransactionInventoryUseCase } from "./transaction-inventory-request"
import { TransactionInventoryRepository } from "../repositories/inventory-transaction-repository"
import { TransactionInventory } from "../entities/inventory-transaction"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"

const fakeRequestTransactionInventory: TransactionInventoryRepository = {
    create: async (transaction: TransactionInventory) => {
        return
    },
    searchTransactionFromPeriod: async (from: Date, to: Date) => {
        throw new Error("Function not implemented.")
    }
}


test('create a transaction inventory request', async () => {
    const instanceRequestTransactionInventory = new TransactionInventoryUseCase(fakeRequestTransactionInventory)

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