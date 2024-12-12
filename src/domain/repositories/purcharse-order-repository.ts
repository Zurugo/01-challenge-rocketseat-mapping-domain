import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Product } from "../entities/product"
import { PurchaseOrder } from "../entities/purchase-order"


export interface PurchaseOrderRepository {
    create(purchaseOrder: PurchaseOrder): Promise<void>
    getProductId(purchaseOrderId: string): Promise<String[]>
    getProfitProducts(productId: string): Promise<{} | null>
}