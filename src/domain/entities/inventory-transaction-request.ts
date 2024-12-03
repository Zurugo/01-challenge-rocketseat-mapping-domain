import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface ReqTransactionInventoryProps {
    inventoryId: UniqueEntityID
    transactionType: 'INBOUND' | 'OUTBOUND'
    quantity: number
    createdAt: Date
    updatedAt?: Date
}

export class RequestTransactionInventory extends Entity<ReqTransactionInventoryProps> {
    get inventoryId() {
        return this.props.inventoryId
    }

    get transactionType() {
        return this.props.transactionType
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

    set transactionType(type: 'INBOUND' | 'OUTBOUND') {
        this.props.transactionType = type
        this.touch()
    }

    set quantity(value: number) {
        this.props.quantity = value
        this.touch()
    }

    static create(
        props: Optional<ReqTransactionInventoryProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const transactionInventoryRequest = new RequestTransactionInventory({
            ...props,
            createdAt: new Date()
        }, id)

        return transactionInventoryRequest
    }
}