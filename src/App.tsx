import * as React from 'react';
import logo from './logo.svg';
import { ReactComponent as CloudsImage } from './assets/images/clouds.svg';
import './App.scss';
import { ShoppingDatesService } from './services/shopping-dates.service';

// import LeftMenu from './components/LeftMenu/LeftMenu';
// import BuyList from './components/BuyList/BuyList';
// Types:
// import Buy from './types/buy.type';
import { MainHeader } from './components/MainHeader/MainHeader';
import { LeftMenu } from './components/LeftMenu/LeftMenu';
import { BuySection } from './components/BuySection/BuySection';
import DetailedDateInfo from './types/DetailedDateInfo';
import BuyInfo from './types/BuyInfo';
import ResponseInfo from './types/ResponseInfo';

interface Props { }
interface State {
  appTitle: string,
  shoppingDates: DetailedDateInfo[],
  activeDate: DetailedDateInfo
  loadingDate: string;
}

class App extends React.Component<Props, State> {
  private shoppingDatesService: ShoppingDatesService = new ShoppingDatesService();

  constructor(props: Props) {
    super(props);
    this.state = {
      appTitle: 'SG Kauf',
      shoppingDates: [],
      loadingDate: '',
      activeDate: {} as DetailedDateInfo
    } as State;
    this.onDateSelected = this.onDateSelected.bind(this);
    this.saveBuy = this.saveBuy.bind(this);
    this.removeBuy = this.removeBuy.bind(this);
  }

  render() {
    return (
      <div className="main-container">
        <MainHeader title={this.state.appTitle} logoSource={logo} />
        <div className="main-content" role="main">
          <div className="main-content__left-menu">
            <LeftMenu items={this.state.shoppingDates} activeItem={this.state.activeDate} loadingItem={this.state.loadingDate} chooseItem={this.onDateSelected} />
          </div>
          <div className="main-content__body col">
            <BuySection activeDate={this.state.activeDate} saveBuy={this.saveBuy} removeBuy={this.removeBuy} />
            <CloudsImage />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getShoppingDates();
  }

  getShoppingDates = async (): Promise<void> => {
    const fetchedShoppingDates = await this.shoppingDatesService.getAllDates();
    if (fetchedShoppingDates && fetchedShoppingDates.length) {
      console.log('fetchedShoppingDates: ', fetchedShoppingDates);
      this.setState({ shoppingDates: fetchedShoppingDates });
    } else {
      console.error('Problem. No dates for left menu loaded.');
    }
  }

  onDateSelected(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, shoppingDate: DetailedDateInfo) {
    e.preventDefault();
    console.log('select date: ', shoppingDate.date);
    this.setLoadingDate(shoppingDate.date);
    this.setActiveDate(shoppingDate.date);
  } 
  
  setLoadingDate (newDate: string) {
    if (newDate === '' || newDate.split('.').length === 3) { // TODO: improve checking
      this.setState({ loadingDate: newDate });
    }
    else  {
      console.warn('Wrong format for "loading date"');
    }
  }

  setActiveDate (newDate: string): boolean {
    const dateToSelect = this.state.shoppingDates.find(item => item.date === newDate);
    if (!dateToSelect) {
        console.warn(`Chosen date ${newDate} for loading buys was not found. No date is selected.`);
        this.setState({ activeDate: {} as DetailedDateInfo });
        return false;
    }
    if (dateToSelect.buys) {
      this.setState({ activeDate: { ...dateToSelect } });
      this.setLoadingDate('');
      return true;
    } else {
      this.shoppingDatesService.readDate(newDate)
        .then((data: BuyInfo[]) => {
            if (data?.length) {
                dateToSelect.buys = data;
                (dateToSelect.count !== undefined && dateToSelect.count !== null) && Reflect.deleteProperty(dateToSelect, 'count');
                this.setState({ activeDate: dateToSelect });
                this.setLoadingDate('');
            } else {
              console.warn(`Received no dates data for ${newDate}`);
            }
        })
        .catch(err => console.log('Fetch Error :-S', err));
        return true;
    }
  }

  saveBuy(buy: BuyInfo) {
    const existingShoppingDate = this.state.shoppingDates.find((shoppingDate: DetailedDateInfo) => shoppingDate.date === buy.date);
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => {
      return buyItem.time === buy.time;
    });
    if (existingBuy) {
      if (window.confirm('The buy you try to add already exists, do you want to overwrite it with the new data?')) {
        console.log(`Confirmed prompt to overwrite the existing buy. The buy on ${buy.date} at ${buy.time} is going to be overwritten...`);
      } else {
        console.log(`Rejected prompt to overwrite the existing buy. The buy on ${buy.date} at ${buy.time} is NOT going to be overwritten...`);
        return false;
      }
    }
    let urlSuffix = `date=${buy.date}&time=${buy.time}`;
    urlSuffix += `&currency=${buy.currency}`;
    urlSuffix += `&country=${buy.address.country}`;
    urlSuffix += `&city=${buy.address.city}`;
    urlSuffix += `&index=${buy.address.index}`;
    urlSuffix += `&street=${buy.address.street}`;
    urlSuffix += `&houseNumber=${buy.address.houseNumber}`;
    urlSuffix += `&payMethod=${buy.payMethod}`;
    urlSuffix += `&shopName=${buy.shopName}`;
    return this.shoppingDatesService.createBuy(urlSuffix)
      .then((data: ResponseInfo) => {
        if (data.success) {
          // TODO: implement response data validation (hash)?
          console.log('Saving buy. Success: ', data.success, ' Status: ', data.message);
          this._addBuy(buy, existingShoppingDate, existingBuy);
          this.setActiveDate(buy.date);
          return true;
        } else {
          throw Error(data.message);
        }
        // state.activeDate
        // thisApp.activeDateBuys = [...data];
      })
      .catch(function (err: Error) {
        console.log('Fetch Error :-S', err);
      });

  }

  removeBuy(buy: BuyInfo) {
    console.log('CHECK: ', this.state.shoppingDates);
    const existingShoppingDate = this.state.shoppingDates.find((shoppingDate: DetailedDateInfo) => shoppingDate.date === buy.date);
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => buyItem.time === buy.time);
    if (!existingBuy) {
      console.log(`Buy for deleting on ${buy.date} at ${buy.time} was not found.`);
      return false;
    }

    if ((window as Window).confirm('Are you sure, you want to delete this buy?')) {
      console.log(`Prompted deleting of the buy. Confirmed. The buy on ${buy.date} at ${buy.time} is going to be deleted...`);
    } else {
      console.log(`Prompted deleting of the buy. Rejected. The buy on ${buy.date} at ${buy.time} is NOT going to be deleted.`);
      return false;
    }
    const urlSuffix = `date=${buy.date}&time=${buy.time}`;

    this.shoppingDatesService.deleteBuy(urlSuffix) // TODO: make no response from server -> do it locally
      .then((newArray: BuyInfo[]) => {
        if (newArray) {
          console.log(`The buy on ${buy.date} at ${buy.time} was successfully removed. ${newArray.length} buys left for this date.`);
          if (newArray.length) {
            if (existingShoppingDate && existingShoppingDate.buys) {
              existingShoppingDate.buys = newArray;
            }
          } else if (existingShoppingDate) {
            console.log(`Date ${buy.date} with no buys left is going to be removed...`);
            const indexOfDateToDelete = this.state.shoppingDates.indexOf(existingShoppingDate);
            console.log('index of date to delete: ', indexOfDateToDelete);
            this.state.shoppingDates.splice(indexOfDateToDelete, 1);
            this.setActiveDate('');

            // TODO: add another possibility for deleting date - separately
            //   if (confirm(`There are no buys left for date ${buy.date}, do you want to delete this shopping date completely?`)) {
            //     console.log(`Prompted deleting of the date. Confirmed. The date ${buy.date} is going to be deleted...`);
            //     const indexOfDateToDelete = state.shoppingDates.find(shoppingDate => shoppingDate === existingShoppingDate);
            //     console.log('indexOfDateToDelete > ', indexOfDateToDelete);
            //   } else {
            //     console.log(`Prompted deleting of the date. Rejected. The date ${buy.date} is NOT going to be deleted.`);
            //     return false;
            //   }
          }
        }
      })
      .catch(function (err: Error) {
        console.log('Fetch Error :-S', err);
      });
  }

  _addBuy(newBuy: BuyInfo, storedDate: DetailedDateInfo | undefined, storedBuy: BuyInfo | undefined) {
    if (!storedDate) {
      storedDate = {
        date: newBuy.date,
        count: 0,
        buys: []
      };
      this.state.shoppingDates.push(storedDate);
    }
    if (storedBuy) {
      storedBuy.currency = newBuy.currency;
      storedBuy.address.index = newBuy.address.index;
      storedBuy.address.country = newBuy.address.country;
      storedBuy.address.city = newBuy.address.city;
      storedBuy.address.street = newBuy.address.street;
      storedBuy.address.houseNumber = newBuy.address.houseNumber;
      storedBuy.payMethod = newBuy.payMethod;
      storedBuy.shopName = newBuy.shopName;
    } else {
      storedDate?.buys?.push(newBuy);
    }
  }
}

export default App; 