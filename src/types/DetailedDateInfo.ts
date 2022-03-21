import BuyInfo from './BuyInfo';

export default interface DetailedDateInfo {
    date: string;
    count: number;
    buys?: BuyInfo[]
}
