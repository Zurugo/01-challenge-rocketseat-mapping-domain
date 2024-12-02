import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface ProductProps {
    name: string
    unitPrice: number
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
    color: string
    createdAt: Date
    updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
    get name() {
        return this.props.name
    }

    get unitPrice() {
        return this.props.unitPrice
    }

    get color() {
        return this.props.color
    }

    get size() {
        return this.props.size
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

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set size(size: 'SMALL' | 'MEDIUM' | 'LARGE') {
        this.props.size = size
        this.touch()
    }

    set color(color: string) {
        this.props.color = color
        this.touch()
    }

    static create(
        props: Optional<ProductProps, 'createdAt'>,
        id?: UniqueEntityID,
    ) {
        const product = new Product({
            ...props,
            createdAt: new Date()
        }, id)

        return product
    }

}