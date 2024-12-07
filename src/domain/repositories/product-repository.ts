import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Product } from "../entities/product"


export interface ProductRepository {
    getProduct(productId: UniqueEntityID): Promise<Product[] | null>
}