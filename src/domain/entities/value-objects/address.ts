export class Address {
    public country: string
    public city: string
    public district: string
    public street: string
    public number: string

    constructor(country: string, city: string, district: string, street: string, number: string) {
        this.country = country
        this.city = city
        this.district = district
        this.street = street
        this.number = number
    }

}