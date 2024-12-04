export class MinimumInventory {
    public value: number

    constructor(value: number) {
        this.value = value
    }

    static verifyInventory(minimumInventory: number, currentInventory: number) { 

        if (currentInventory <= minimumInventory) {
            return 'The minimum quantity this product is less than minimum register'
        }

        return;
    }
}