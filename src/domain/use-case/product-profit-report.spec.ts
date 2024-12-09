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
            productId: new UniqueEntityID('1'),
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

console.log('ID da venda 1:', purchaseOrderOne.id, 'ID da venda 2:', purchaseOrderTwo.id)
let saleItems: Sale[] = [saleOneTest, saleTwoTest]
let purchaseOrderItems: PurchaseOrder[] = [purchaseOrderOne, purchaseOrderTwo]


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
        for (const order of purchaseOrderItems) {
            const id = order.id.toString()
            if (id === purchaseOrderId) {
                for (const item of order.orderProducts) {
                    return item.productId
                }
            }
        }

        throw new Error('Product not found')
    },
  
    getProfitProducts: async (productId: string) => {
        let totalQuantity = 0
        let subTotalProfitProduct = 0

        for(const order of purchaseOrderItems) {
            for (const product of order.orderProducts) {
                const id = product.productId.toString()
                console.log(id)
                if (id === productId) {
                    totalQuantity += product.quantity
                    subTotalProfitProduct += product.subTotal
                }
            }
        }
        
        return {
            productId,
            totalQuantity,
            subTotalProfitProduct
        }
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