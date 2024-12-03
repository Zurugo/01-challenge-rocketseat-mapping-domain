import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { RequestTransactionInventory } from "../entities/inventory-transaction-request"
import { RequestTransactionInventoryRepository } from "../repositories/inventory-transaction-request-repository"

interface TransactionInventoryRequest {
    inventoryId: string
    transactionType: 'INBOUND' | 'OUTBOUND'
    quantity: number 
}

export class TransactionInventory {
    constructor(
        private requestTransactionInventoryRepository: RequestTransactionInventoryRepository
    ) {}

    async execute({ inventoryId, transactionType, quantity }: TransactionInventoryRequest){
        const transaction = RequestTransactionInventory.create({
            inventoryId: new UniqueEntityID(inventoryId),
            transactionType,
            quantity
        })

        await this.requestTransactionInventoryRepository.create(transaction)

        return transaction
    }
}