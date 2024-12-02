import { PurchaseOrder } from "../entities/purchase-order"

export interface PurchaseOrderRepository {
    create(purchaseOrder: PurchaseOrder): Promise<void>
}