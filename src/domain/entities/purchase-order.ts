import { Entity } from "../../core/entities/entity"
import { Product } from "./product"

interface PurchaseOrderProps {
    items: Product[]
    quantity: number
    total: number    
    createdAt: Date
    UpdatedAt?: Date
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
    get items() {
        return this.props.items
    }

    get price() {
        return this.props.total
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