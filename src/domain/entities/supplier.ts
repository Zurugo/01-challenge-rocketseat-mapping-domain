import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { Address } from "./value-objects/address"
import { Optional } from "@/core/types/optional"


interface SupplierProps {
    cnpj: string
    legal_name: string
    email: string
    phone: string
    address: Address
    createdAt: Date
    updatedAt?: Date
}

export class Supplier extends Entity<SupplierProps> {
    get cnpj() {
        return this.props.cnpj
    }

    get legal_name() {
        return this.props.legal_name
    }

    get email() {
        return this.props.email
    }

    get phone() {
        return this.props.phone
    }

    get address() {
        return this.props.address
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set cnpj(cnpj: string) {
        this.props.cnpj = cnpj
        this.touch()
    }

    set legal_name(legalName: string) {
        this.props.legal_name = legalName
        this.touch()
    }

    set email(email: string) {
        this.props.email = email
        this.touch()
    }

    set phone(phone: string) {
        this.props.phone = phone
        this.touch()
    }

    set address(address: Address) {
        this.props.address = address
        this.touch()
    }

    static create(
        props: Optional<SupplierProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const supplier = new Supplier({
            ...props,
            createdAt: new Date()
        }, id)

        return supplier
    }
}