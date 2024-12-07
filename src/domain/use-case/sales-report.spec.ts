import { SalesReportUseCase } from "./sales-report"
import { SalesRespository } from "../repositories/sale-repository"
import { Sale } from "../entities/sales"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import dayjs from "dayjs"
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const saleOneTest = Sale.create({
    purchaseOrderId: new UniqueEntityID('1'),
    totalPrice: 580
})

const saleTwoTest = Sale.create({
    purchaseOrderId: new UniqueEntityID('2'),
    totalPrice: 321
})

const saleThreeTest = Sale.create({
    purchaseOrderId: new UniqueEntityID('3'),
    totalPrice: 100
})

const saleFourTest = Sale.create({
    purchaseOrderId: new UniqueEntityID('4'),
    totalPrice: 32

})

const saleFiveTest = Sale.create({
    purchaseOrderId: new UniqueEntityID('4'),
    totalPrice: 32
})

let items: Sale[] = [saleOneTest, saleTwoTest, saleThreeTest, saleFourTest, saleFiveTest]

const fakeSalesRepository: SalesRespository = {
    create: async (sale: Sale) => {
        throw new Error("Function not implemented.")
    },

    searchSalesFromPeriod: async (from: Date, to: Date) => {
        const fromDate = dayjs(from)
        const toDate = dayjs(to)

        const reportSales = items.filter((sale) => {
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


test('report sales requested by date period', async () => {
    const instanceReportSales = new SalesReportUseCase(fakeSalesRepository)

    const reportSales = await instanceReportSales.execute({
        from: new Date('2024-12-01T00:00:00Z'),
        to: new Date('2024-12-31T00:00:00Z')
    })


    expect(reportSales).toHaveLength(5)
})