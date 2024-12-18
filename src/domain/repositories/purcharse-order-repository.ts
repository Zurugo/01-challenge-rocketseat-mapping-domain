import { OrderProducts, PurchaseOrder } from "../entities/purchase-order"


export interface PurchaseOrderRepository {
    create(purchaseOrder: PurchaseOrder): Promise<void>
    getProductId(purchaseOrderId: string): Promise<String[]>
    getProfitProduct(productId: string): Promise<OrderProducts | null>
}