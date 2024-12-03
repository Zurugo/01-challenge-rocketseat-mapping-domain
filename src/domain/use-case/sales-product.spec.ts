import { CreateSaleUseCase } from "./sales-product"
import { SalesRespository } from "../repositories/sales-repository"
import { Sale } from "../entities/sales"
import { UniqueEntityID } from "@/core/entities/unique.entity-id";


const fakeSalesRepository: SalesRespository = {
    create: async (sale: Sale) => {
        return;
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