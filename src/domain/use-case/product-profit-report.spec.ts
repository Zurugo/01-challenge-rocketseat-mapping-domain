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

    
    getProfitProducts: async (productId: UniqueEntityID) => {
        const listProdutsInOrder = purchaseOrderItems.forEach((item) => item.id === productId) {
            // return item
        }





        throw new Error("Function not implemented.")
    }
}