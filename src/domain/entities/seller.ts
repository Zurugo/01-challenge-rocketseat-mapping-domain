import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface SellerProps {
    name: string
    email: string
    createdAt: Date
    updatedAt?: Date
}

export class Seller extends Entity<SellerProps> {
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set email(email: string) {
        this.props.email = email
        this.touch()
    }

    static create(
        props: Optional<SellerProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const seller = new Seller({
            ...props,
            createdAt: new Date()
        }, id)


        return seller
    }
}