import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/types/optional"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { MinimumInventory } from "./value-objects/minimum-inventory-quantity"


interface InventoryProps {
    productId: UniqueEntityID
    minInventory: MinimumInventory
    quantity: number
    unitPrice: number
    createdAt: Date
    updatedAt?: Date
}

export class Inventory extends Entity<InventoryProps> {
    get productId() {
        return this.props.productId
    }

    get minInventory() {
        return this.props.minInventory
    }

    get quantity() {
        return this.props.quantity
    }

    get unitPrice() {
        return this.props.unitPrice
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
    
    set minInventory(minInventory: MinimumInventory) {
        this.props.minInventory = minInventory
        this.touch()
    }

    set quantity(quantity: number) {
        this.props.quantity = quantity
        this.touch()
    }

    set unitPrice(value: number) {
        this.props.unitPrice = value
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