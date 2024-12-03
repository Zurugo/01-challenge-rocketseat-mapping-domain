import { CreatePurchaseOrderUseCase } from "./purchase-order"
import { PurchaseOrderRepository } from "../repositories/purcharse-order-repository"
import { PurchaseOrder } from "../entities/purchase-order"
import { Product } from "../entities/product"

const fakePurchaseOrderRepository: PurchaseOrderRepository = {
    create: async (purchaseOrder: PurchaseOrder) => {
        return;
    }
}

test('create an purchase order', async () => {
    const pen = Product.create({
        name: 'Pen',
        unitPrice: 3,
        size: 'SMALL',
        color: 'red'
    })

    const orderProducts = [{ product_id: pen.id, quantity: 2, subTotal: pen.unitPrice * 2 }]

    const instancePurchaseOrder = new CreatePurchaseOrderUseCase(fakePurchaseOrderRepository)

    const purchaseOrder = await instancePurchaseOrder.execute({
        purchaserId: '1',
        sellerId: '1',
        orderProducts: orderProducts
    })

    
    expect(purchaseOrder.orderProducts).toHaveLength(1)
    expect(purchaseOrder.orderProducts).toEqual([
        expect.objectContaining({ product_id: pen.id, quantity: 2, subTotal: 6})
    ])
}) 