import { Entity } from "../../core/entities/entity"
import { MinimumInventory } from "./value-objects/minimum-inventory-quantity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface ProductProps {
    name: string
    minInventory: MinimumInventory
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

    get minInventory() {
        return this.props.minInventory
    }

    get unitPrice() {
        return this.props.unitPrice
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

    set minInventory(minInventory: MinimumInventory) {
        this.props.minInventory = minInventory
        this.touch()
    }

    set unitPrice(unitPrice: number) {
        this.props.unitPrice = unitPrice
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