import React from 'react';
import logo from './logo.svg';
import './App.scss';

import LeftMenu from './components/LeftMenu/LeftMenu';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [{
        "date": "04.01.2021",
        "count": 22
      },
      {
        "date": "05.01.2021",
        "count": 9
      },
      {
        "date": "06.01.2021",
        "count": 15
      },
      {
        "date": "09.01.2021",
        "count": 21
      },
      {
        "date": "12.01.2021",
        "count": 5
      },
      {
        "date": "12.03.2021",
        "count": 3
      }],
      selecteDate: '06.01.2021'
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    // navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow
    return (
      <div className="App">
        <header className="main-header"> 
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
            <img src={logo} className="react-logo App-logo" alt="logo" />
            SG Kauf
          </a>
          <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap">
                <a className="nav-link" href="/">Sign out</a>
              </li>
            </ul>
        </header>
        <div className="container-fluid main-wrapper">
          <div className="row">
            <div className="col main-content">
              <div id="spend-track">
                <div className="row">
                  <div className="main-content__left-menu">
                    {/* <left-menu :dates='dates' :selected-date='activeDate' @date-selected='getDate' :key='Date.now()' />  */}
                    <LeftMenu dates={this.state.dates} selected-date={this.state.selectedDate} />  
                  </div>
                  <div className="main-content__body col">
                    {/* <buy-list :dateBuys="activeDateBuys" @save-product="saveProduct" @remove-product="removeProduct" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 y-auto aside">
              {/* <sum-calc :amount="calculatedSum" :currency="activeCurrency" @get-calc-sum="getCalcSum" @get-whole-sum="getWholeSum" /> <!-- TODO: currency exchange      |:dateRange=""|         --> 
              <sum :date="activeDate" :amount="activeSum" :currency="activeCurrency" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;