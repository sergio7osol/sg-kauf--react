import {
    Currency,
    PayMethod,
    ShopName
} from './StaticBuyInfoTypes';
import Address from './ShopAddress';
import Product from './Product';

export default interface BuyInfo {
    date: string,
    time: string,
    count?: number,
    currency: Currency,
    address: Address,
    payMethod: PayMethod,
    shopName: ShopName,
    products: Product[]
}
