import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Sale } from "../entities/sales"
import { SalesRespository } from "../repositories/sale-repository"


interface SaleUseCaseRequest {
    purchaseOrderId: string
    totalPrice: number
}


export class CreateSaleUseCase {
    constructor(
        private salesRepository: SalesRespository
    ) {}


    async execute({ purchaseOrderId, totalPrice }: SaleUseCaseRequest) {
        const sale = Sale.create({
            purchaseOrderId: new UniqueEntityID(purchaseOrderId),
            totalPrice,
        })

        await this.salesRepository.create(sale)
        

        return sale
    }
}