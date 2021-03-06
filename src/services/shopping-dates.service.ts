import axios from 'axios';
import BuyInfo from '../types/BuyInfo';
// import BuyInfo from '../types/BuyInfo';
import DetailedDateInfo from '../types/DetailedDateInfo';
import ResponseInfo from '../types/ResponseInfo';

export class ShoppingDatesService {
    // private shoppingDates: BuyInfo[];
    private apiClient = axios.create({
      baseURL: 'http://localhost:3030',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    constructor() { }

    getAllDates(): Promise<DetailedDateInfo[]> {
      return this.apiClient.get('/list-dates').then((response) => {
        if (response.status !== 200) {
          throw Error(
            'Looks like there was a problem. Status Code: ' + response.status
          );
        }
        return response.data;
      });
    }

    readDate(newDate: string): Promise<BuyInfo[]> {
      return this.apiClient.get(`/read-date?date=${newDate}`)
          .then(response => {
              if (response.status !== 200) {
                  throw Error('Looks like there was a problem. Status Code: ' + response.status);
              }
              return response.data;
          })
    }

    createBuy(dataSuffix: string): Promise<ResponseInfo> {
      return this.apiClient.get('/save-buy?' + dataSuffix)
          .then(response => {
              if (response.status !== 200) {
                  throw Error('Looks like there was a problem. Status Code: ' + response.status);
              }
              return response.data;
          });
  }

    deleteBuy(dataSuffix: string): Promise<BuyInfo[]> {
      return this.apiClient.get('/remove-buy?' + dataSuffix).then((response) => {
        if (response.status !== 200) {
          throw Error(
            'Looks like there was a problem. Status Code: ' + response.status
          );
        }
        return response.data;
      });
    }
}