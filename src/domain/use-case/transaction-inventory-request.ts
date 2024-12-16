import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { TransactionInventory } from "../entities/inventory-transaction"
import { TransactionInventoryRepository } from "../repositories/inventory-transaction-repository"

interface TransactionInventoryRequest {
    inventoryId: string
    transactionType: 'INBOUND' | 'OUTBOUND'
    quantity: number 
}

export class TransactionInventoryUseCase {
    constructor(
        private requestTransactionInventoryRepository: TransactionInventoryRepository
    ) {}

    async execute({ inventoryId, transactionType, quantity }: TransactionInventoryRequest){
        const transaction = TransactionInventory.create({
            inventoryId: new UniqueEntityID(inventoryId),
            transactionType,
            quantity
        })

        await this.requestTransactionInventoryRepository.create(transaction)

        return transaction
    }
}