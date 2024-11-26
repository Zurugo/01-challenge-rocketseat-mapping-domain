import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"
import { Product } from "./product"

interface SalesProps {
    items: Product[]
    price: number
    product_id: UniqueEntityID
    quantity: number
    createdAt: Date
    UpdatedAt?: Date
}

export class Sales extends Entity<SalesProps> {
    get items() {
        return this.props.items
    }

    get price() {
        return this.props.price
    }

    get product_id() {
        return this.props.product_id
    }

    get quantity() {
        return this.props.quantity
    }

    private touch() {
        this.props.UpdatedAt = new Date()
    }

    set items(items: Product[]) {
        this.props.items = items
        this.touch()
    }

    set quantity(quantity: number) {
        this.props.quantity = quantity
        this.touch()
    }
}