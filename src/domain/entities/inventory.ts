import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/types/optional"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"


interface InventoryProps {
    productId: UniqueEntityID
    quantity: number
    createdAt: Date
    updatedAt: Date
}

export class Inventory extends Entity<InventoryProps> {
    get productId() {
        return this.props.productId
    }

    get quantity() {
        return this.props.quantity
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

    set quantity(quantity: number) {
        this.props.quantity = quantity
        this.touch()
    }

    protected addItem(qty: number) {
       const curQty = this.props.quantity + qty

       this.props.quantity = curQty

       return curQty
    }

    protected rmvItem(qty: number) {
        const curQty = this.props.quantity - qty

        this.props.quantity = curQty

        return curQty
    }

    static create(
        props: Optional<InventoryProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const inventory = new Inventory({
            ...props,
            createdAt: new Date()
        }, id)

        return Inventory
    }
}