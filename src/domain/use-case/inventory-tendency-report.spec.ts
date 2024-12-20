import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Inventory } from "../entities/inventory"
import { MinimumInventory } from "../entities/value-objects/minimum-inventory-quantity"
import { TransactionInventory } from "../entities/inventory-transaction"
import { InventoryRepository } from "../repositories/inventory-repository"
import { TransactionInventoryRepository } from "../repositories/inventory-transaction-repository"
import { InventoryTendencyReportUseCase } from "./inventory-tendency-report"


import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const inventoryItemOne = Inventory.create({
    productId: new UniqueEntityID('1'),
    minInventory: new MinimumInventory(2),
    quantity: 40
})

const inventoryItemTwo = Inventory.create({
    productId: new UniqueEntityID('2'),
    minInventory: new MinimumInventory(5),
    quantity: 50
})


const transactionInventoryOne = TransactionInventory.create({
    inventoryId: inventoryItemOne.id,
    stockistId: new UniqueEntityID('1'),
    transactionType: 'INBOUND',
    quantity: 2
})
//Refresh actually quantity in inventory
inventoryItemOne.rmvItem(transactionInventoryOne.quantity)


const transactionInventoryTwo = TransactionInventory.create({
    inventoryId: inventoryItemOne.id,
    stockistId: new UniqueEntityID('2'),
    transactionType: 'OUTBOUND',
    quantity: 5
})
inventoryItemOne.rmvItem(transactionInventoryTwo.quantity)


const transactionInventoryThree = TransactionInventory.create({
    inventoryId: inventoryItemOne.id,
    stockistId: new UniqueEntityID('1'),
    transactionType: 'OUTBOUND',
    quantity: 20
})
inventoryItemOne.rmvItem(transactionInventoryThree.quantity)

const transactionInventoryFour = TransactionInventory.create({
    inventoryId: inventoryItemTwo.id,
    stockistId: new UniqueEntityID('3'),
    transactionType: 'OUTBOUND',
    quantity: 20
})
inventoryItemTwo.rmvItem(transactionInventoryFour.quantity)

let inventory: Inventory[] = [inventoryItemOne, inventoryItemTwo]
let transactions: TransactionInventory[] = [transactionInventoryOne, transactionInventoryTwo, transactionInventoryThree, transactionInventoryFour]

const fakeInventoryRepository: InventoryRepository = {
    getInventory: async (inventoryId: string) => {
        const reportInventorys = inventory.find(item => item.id.toString() === inventoryId)

        if (!reportInventorys) {
            return null
        }

        return reportInventorys
    }
}

const fakeTransactionInventoryRepository: TransactionInventoryRepository = {
    create: function (requestTransactionInventory: TransactionInventory): Promise<void> {
        throw new Error("Function not implemented.")
    },
    searchTransactionFromPeriod: async (from: Date, to: Date) => {
        const fromDate = dayjs(from)
        const toDate = dayjs(to)

        const reportTransactions = transactions.filter((transaction) => {
            const transactionDate = dayjs(transaction.createdAt)

            if(transactionDate.isSameOrAfter(fromDate.startOf('day')) && transactionDate.isSameOrBefore(toDate.startOf('day'))) {
                return transaction
            }
            return null
        })

        return reportTransactions
    }
}


test('Tendency inventory by period', async () => {
    const instaceProductProfitReport = new InventoryTendencyReportUseCase(fakeInventoryRepository, fakeTransactionInventoryRepository)

    const inventoryTendencyReports = await instaceProductProfitReport.execute({
        from: new Date('2024-12-01T00:00:00Z'),
        to: new Date('2024-12-31T00:00:00Z')
    })

    expect(inventoryTendencyReports).toHaveLength(4)
})
