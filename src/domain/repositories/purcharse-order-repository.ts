import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Product } from "../entities/product"
import { PurchaseOrder } from "../entities/purchase-order"

export interface PurchaseOrderRepository {
    create(purchaseOrder: PurchaseOrder): Promise<void>
    getProfitProducts(productId: UniqueEntityID): Promise<PurchaseOrder[] | null>
}