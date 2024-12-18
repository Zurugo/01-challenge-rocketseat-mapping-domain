import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { TransactionInventory } from "../entities/inventory-transaction"
import { TransactionInventoryRepository } from "../repositories/inventory-transaction-repository"

interface TransactionInventoryRequest {
    inventoryId: string
    stockistId: string
    transactionType: 'INBOUND' | 'OUTBOUND'
    quantity: number 
}

export class TransactionInventoryUseCase {
    constructor(
        private requestTransactionInventoryRepository: TransactionInventoryRepository
    ) {}

    async execute({ inventoryId, stockistId, transactionType, quantity }: TransactionInventoryRequest){
        const transaction = TransactionInventory.create({
            inventoryId: new UniqueEntityID(inventoryId),
            stockistId: new UniqueEntityID(stockistId),
            transactionType,
            quantity
        })

        await this.requestTransactionInventoryRepository.create(transaction)

        return transaction
    }
}