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


let saleItems: Sale[] = []
let purchaseOrderItems: PurchaseOrder[] = []


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