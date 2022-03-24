import * as React from 'react';
import logo from './logo.svg';
import { ReactComponent as RocketSmokeImage } from './assets/images/rocket-smoke.svg';
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
            <BuySection activeDate={this.state.activeDate} />
            <RocketSmokeImage />
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
    console.log('shoppingDate: ', shoppingDate);
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
}

export default App;