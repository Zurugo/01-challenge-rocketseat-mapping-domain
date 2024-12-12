import { ProductProfitReportUseCase } from "./product-profit-report"
import { SalesRespository } from "../repositories/sale-repository"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { Sale } from "../entities/sales"
import dayjs from "dayjs"
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { PurchaseOrder } from "../entities/purchase-order"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

interface ProfitProducts {
    productId: string
    totalQuantity: number
    totalSubPriceEachItem: number
}


const purchaseOrderOne = PurchaseOrder.create({
    //id: 306c46ea-6688-443f-a863-4811ca18ad63
    purhcaserId: new UniqueEntityID('1'),
    sellerId: new UniqueEntityID('1'),
    orderProducts: [
        {
            productId: new UniqueEntityID('1'),
            quantity: 3,
            subTotal: 30
        },
        {
            productId: new UniqueEntityID('2'),
            quantity: 50,
            subTotal: 50
        },
    ],
    totalPrice: 80
})

const purchaseOrderTwo = PurchaseOrder.create({
    purhcaserId: new UniqueEntityID('1'),
    sellerId: new UniqueEntityID('1'),
    orderProducts: [
        {
            productId: new UniqueEntityID('3'),
            quantity: 3,
            subTotal: 30
        },
        {
            productId: new UniqueEntityID('2'),
            quantity: 60,
            subTotal: 60
        },
    ],
    totalPrice: 90
})

const saleOneTest = Sale.create({
    purchaseOrderId: purchaseOrderOne.id,
    totalPrice: 80
})

const saleTwoTest = Sale.create({
    purchaseOrderId: purchaseOrderTwo.id,
    totalPrice: 90
})

let saleItems: Sale[] = [saleOneTest, saleTwoTest]
let purchaseOrders: PurchaseOrder[] = [purchaseOrderOne, purchaseOrderTwo]
let productIds: String[] = []

const fakeSalesRepository: SalesRespository = {
    create: async (sale: Sale) => {
        throw new Error("Function not implemented.")
    },

    searchSalesFromPeriod: async (from: Date, to: Date) => {
        const fromDate = dayjs(from)
        const toDate = dayjs(to)

        const reportSales = saleItems.filter((sale) => {
            const saleDate = dayjs(sale.createdAt)
    
            if(saleDate.isSameOrAfter(fromDate.startOf('day')) && saleDate.isSameOrBefore(toDate.startOf('day'))) {
                return sale
            }

            return null
        })

        if (reportSales.length === 0) {
            return null
        }

        return reportSales
    }
}

const fakePurchaseOrderRepository: PurchaseOrderRepository = {
    create: async (purchaseOrder: PurchaseOrder) => {
        return
    },

    getProductId: async (purchaseOrderId: string) => {
        const purchaseOrder = purchaseOrders.find(order => order.id.toString() === purchaseOrderId)
        
        if (!purchaseOrder) {
            throw new Error ('Resource not found')
        }

        const productIds = purchaseOrder.orderProducts.map(product => product.productId.toString())
        
        return productIds
    },
  
    getProfitProducts: async (productId: string) => {
        const getProducts = purchaseOrders.flatMap(order => order.orderProducts)

        const getProductId = getProducts.filter(item => item.productId.toString() === productId)

        if (getProductId.length === 0) {
            return null
        }

        const profitReport = getProductId.reduce(
            (acc, product) => {
                acc.quantity += product.quantity
                acc.subTotal += product.subTotal

                return acc
            }
        )

        return profitReport
    }
}

test('Product profit reports by period', async () => {
    const instanceProductProfitReport = new ProductProfitReportUseCase(fakeSalesRepository, fakePurchaseOrderRepository)

    const productProfitReport = await instanceProductProfitReport.execute({
        from: new Date('2024-12-01T00:00:00Z'),
        to: new Date('2024-12-31T00:00:00Z')
    })
    console.log(productProfitReport)
})