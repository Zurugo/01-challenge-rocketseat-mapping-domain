import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Product } from "./product"
import { Optional } from "../../core/types/optional"

interface PurchaseOrderProps {
    purhcaserId: UniqueEntityID
    sellerId: UniqueEntityID
    items: Product[]
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

    get items() {
        return this.props.items
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

    set items(items: Product[]) {
        this.props.items = items
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