import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Product } from "../entities/product"
import { OrderProducts, PurchaseOrder } from "../entities/purchase-order"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { CreatePurchaseOrderUseCase } from "./purchase-order"

const fakePurchaseOrderRepository: PurchaseOrderRepository = {
    create: async (purchaseOrder: PurchaseOrder) => {
        return
    },
    getProductId: function (purchaseOrderId: string): Promise<String[]> {
        throw new Error("Function not implemented.")
    },
    getProfitProduct: function (productId: string): Promise<OrderProducts | null> {
        throw new Error("Function not implemented.")
    }
}

test('create an purchase order', async () => {
    const pen = Product.create({
        name: 'Pen',
        unitPrice: 3,
        size: 'SMALL',
        color: 'red'
    })

    const orderProducts = [{ productId: pen.id, quantity: 2, subTotal: pen.unitPrice * 2 }]

    const instancePurchaseOrder = new CreatePurchaseOrderUseCase(fakePurchaseOrderRepository)

    const purchaseOrder = await instancePurchaseOrder.execute({
        purchaserId: '1',
        sellerId: '1',
        orderProducts: orderProducts
    })

    
    expect(purchaseOrder.orderProducts).toHaveLength(1)
    expect(purchaseOrder.orderProducts).toEqual([
        expect.objectContaining({ productId: pen.id, quantity: 2, subTotal: 6})
    ])
}) 