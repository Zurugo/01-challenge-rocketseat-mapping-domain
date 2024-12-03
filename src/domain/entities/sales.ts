import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface SaleProps {
    purchaseOrderId: UniqueEntityID
    totalPrice: number
    createdAt: Date
    updatedAt?: Date
}

export class Sale extends Entity<SaleProps> {
    get purhcaseOrderId() {
        return this.props.purchaseOrderId
    }

    get totalPrice() {
        return this.props.totalPrice
    }

    get createdAt() {
        return this.props.createdAt
    }

    static create(
        props: Optional<SaleProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const sale = new Sale({
            ...props,
            createdAt: new Date()
        }, id)

        return sale
    }
}