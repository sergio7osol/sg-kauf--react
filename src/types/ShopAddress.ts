import { Country, Index, City, Street, HouseNumber } from './StaticBuyInfoTypes';

export default interface Address {
    country: Country,
    index: Index,
    city: City,
    street: Street,
    houseNumber: HouseNumber
}
