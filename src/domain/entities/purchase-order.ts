import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Product } from "./product"
import { Optional } from "../../core/types/optional"


interface OrderProducts {
    product_id: UniqueEntityID
    quantity: number
}

interface PurchaseOrderProps {
    purhcaserId: UniqueEntityID
    sellerId: UniqueEntityID
    orderProducts: OrderProducts[]
    totalPrice: number    
    createdAt: Date
    UpdatedAt?: Date
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
    get purchaserId() {
        return this.props.purhcaserId
    }

    get sellerId() {
        return this.props.sellerId
    }

    get orderProducts() {
        return this.props.orderProducts
    }

    get totalPrice() {
        return this.props.totalPrice
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.UpdatedAt = new Date()
    }

    set orderProducts(value: OrderProducts[]) {
        this.props.orderProducts = value
        this.touch()
    }

    set totalPrice(value: number) {
        this.props.totalPrice = value
        this.touch()
    }

    static create(
        props: Optional<PurchaseOrderProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const purchaseOrder = new PurchaseOrder({
            ...props,
            createdAt: new Date()
        }, id)


        return purchaseOrder
    }    
}