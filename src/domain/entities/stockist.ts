import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"

interface StockistProps {
    name: string
    email: string
    createdAt: Date
    updatedAt?: Date
}

export class Stockist extends Entity<StockistProps> {
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
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
        props: Optional<StockistProps, 'createdAt'>,
        id?: UniqueEntityID,
    ) {
        const stockist = new Stockist({
            ...props,
            createdAt: new Date()
        }, id)

        return stockist
    }

}