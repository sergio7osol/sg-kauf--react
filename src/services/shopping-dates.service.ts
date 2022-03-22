import axios from 'axios';
import BuyInfo from '../types/BuyInfo';
// import BuyInfo from '../types/BuyInfo';
import DetailedDateInfo from '../types/DetailedDateInfo';

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
}