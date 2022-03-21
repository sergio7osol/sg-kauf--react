import { Measure } from './StaticBuyInfoTypes';

export default interface Product {
    name: string,
    price: number,
    weightAmount: number,
    measure: Measure,
    description: string,
    discount: number | string
}
