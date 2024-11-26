import { UniqueEntityID } from "../../../core/entities/unique.entity-id"

export class Inventory {
    public minimum: number

    constructor(minimum: number) {
        this.minimum = minimum
    }


    static verifyInvetory(product_id: UniqueEntityID, minimum: number) {

    }
}