import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"



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

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set minQuantity(minQuantity: number) {
        this.props.minQuantity = minQuantity
        this.touch()
    }


    set curQuantity(curQuantity: number) {
        this.props.curQuantity = curQuantity
        this.touch()
    }

    set price(price: number) {
        this.props.price = price
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