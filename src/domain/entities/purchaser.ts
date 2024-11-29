import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique.entity-id"
import { Optional } from "../../core/types/optional"
import { Address } from "./value-objects/address"


interface PurchaserProps {
    name: string
    email: string
    cpf: string
    address: Address
    createdAt: Date
    updatedAt?: Date
}



export class Purchaser extends Entity<PurchaserProps> {
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get cpf() {
        return this.props.cpf
    }

    get address() {
        return this.props.address
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

    set email(email: string) {
        this.props.email = email
        this.touch()
    }

    set cpf(cpf: string) {
        this.props.cpf = cpf
        this.touch()
    }

    set address(address: Address) {
        this.props.address = address
    }

    static create(
        props: Optional<PurchaserProps, 'createdAt'>,
        id?: UniqueEntityID,
    ) {
        const purchaser = new Purchaser({
            ...props,
            createdAt: new Date()
        }, id)

        return purchaser
    }

}