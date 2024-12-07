import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { PurchaseOrder } from "../entities/purchase-order"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"

interface OrderProducts {
    productId: UniqueEntityID
    quantity: number
    subTotal: number
}

interface PurchaseOrderUseCaseRequest {
    purchaserId: string
    sellerId: string
    orderProducts: OrderProducts[]
}

export class CreatePurchaseOrderUseCase {
    constructor(
        private purchaseOrderRepository: PurchaseOrderRepository
    ) {}

    async execute({ purchaserId, sellerId, orderProducts }: PurchaseOrderUseCaseRequest) {
        const purchaseOrder =  PurchaseOrder.create({
            purhcaserId: new UniqueEntityID(purchaserId),
            sellerId: new UniqueEntityID(sellerId),
            orderProducts,
            totalPrice: orderProducts.reduce((sum, item) => sum + item.subTotal, 0),
        })

        await this.purchaseOrderRepository.create(purchaseOrder)
        
        return purchaseOrder
    }
}