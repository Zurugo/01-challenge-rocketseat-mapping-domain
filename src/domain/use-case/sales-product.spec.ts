import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Sale } from "../entities/sales"
import { SalesRespository } from "../repositories/sale-repository"
import { CreateSaleUseCase } from "./sales-product"

const fakeSalesRepository: SalesRespository = {
    create: async (sale: Sale) => {
        return;
    },
    searchSalesFromPeriod: function (from: Date, to: Date): Promise<Sale[] | null> {
        throw new Error("Function not implemented.");
    }
}

test('create an sale', async () => {
    const instanceSale = new CreateSaleUseCase(fakeSalesRepository)

    const sale = await instanceSale.execute({
        purchaseOrderId: '1',
        totalPrice: 321
    })
    
    expect(sale.id).toEqual(expect.any(UniqueEntityID))
    expect(sale.totalPrice).toEqual(321)
})