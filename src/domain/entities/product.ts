import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"



interface ProductProps {
    name: string
    minQuantity: number
    curQuantity: number
    price: number
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
    color: string
    createdAt: Date
    updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
    get name() {
        return this.props.name
    }

    get minQuantity() {
        return this.props.minQuantity
    }

    get curQuantity() {
        return this.props.curQuantity
    }

    get price() {
        return this.props.price
    }

    get color() {
        return this.props.color
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

}