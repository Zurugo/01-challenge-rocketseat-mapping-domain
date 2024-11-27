export class MinimumInventory {
    public value: number

    constructor(value: number) {
        this.value = value
    }

    static verifyIventory(minimumInventory: number, currentIventory: number) {   
        if (currentIventory <= minimumInventory) {
            return 'The minimum quantity this product is less than minimum register'
        }
    }
}