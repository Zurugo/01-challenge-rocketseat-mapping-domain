import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface IncomingInventoryProps {
    supplierId: UniqueEntityID
    productId: UniqueEntityID
    estimatedDatedToReceiveProduct: Date
    createdAt: Date
    updatedAt?: Date
}

export class IncomingInventoryIntegration extends Entity<IncomingInventoryProps> {
    get supplierId() {
        return this.props.supplierId
    }

    get productId() {
        return this.props.productId
    }

    get estimatedDatedToReceive() {
        return this.props.estimatedDatedToReceiveProduct
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set estimatedDatedToReceiveProduct(date: Date) {
        this.props.estimatedDatedToReceiveProduct = date
        this.touch()
    }

    static create(
        props: Optional<IncomingInventoryProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const integrationSupplierData = new IncomingInventoryIntegration({
            ...props,
            createdAt: new Date()
        }, id)


        return integrationSupplierData
    }
}