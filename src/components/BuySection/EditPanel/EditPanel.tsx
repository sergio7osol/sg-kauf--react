import './EditPanel.scss';
import { useState } from 'react';
import BuyInfo from '../../../types/BuyInfo';

interface Props {
    saveBuy: (buy: BuyInfo) => any
}

export const EditPanel: React.FC<Props> = ({ saveBuy }) => {
    const initState = {
        date: '',
        time: "00:00",
        currency: "EUR",
        address: {
            country: "Germany",
            index: "",
            city: "Hamburg",
            street: "",
            houseNumber: ""
        },
        payMethod: "EC card",
        shopName: "",
        products: []
    };
    const [state, setState] = useState(initState);
    const StaticValueCollection = { // TODO: move to server
        countries: ['Germany', 'Russia', 'online'],
        shopNames: ['REWE', 'ALDI', 'Kaufland', 'Lidl', 'PENNY', 'Amazon.de', 'Netflix.com', 'Edeka', 'IKEA', 'BAUHAUS', 'OBI', 'ROHLFS BÄCKEREI KONDITOREI GmbH', 'Apotheke a.d. Friedenseiche Nikolaus Wendel', 'About you', 'Netflix', 'Innovativelanguage.com', 'Mango', 'OVB', 'Vodavone GmbH', 'Telekom Deutschland GmbH', 'Ernst Scholz', 'Sparkasse', 'Apotheke in der Marktplatz Galerie', 'easyApotheke'],
        indexes: ['22307', '22529', '22299', '20251', '22761', '22301', '20249', '22459', '22525', '22041', '22177', '22179', '22457', 'online', ''],
        cities: ['Hamburg', 'Moscow', 'Saransk', 'online', ''],
        streets: ['Alte Kollaustraße', 'Fuhlsbuettler Str.', 'Troplowitzstrasse', 'Osterfeldestrasse', 'Wunderbrunnen', 'Winterhuder Marktplatz', 'Eppendorfer Marktplatz', 'Stresemannstrasse', 'Nedderfeld', 'Dorotheenstrasse', 'Kümmellstraße', 'Kieler Straße', 'Grelckstraße', 'Tibarg', 'Walddörferstraße', 'Eppendorfer Baum', 'Bramfelder Chaussee', 'Bramfelder Dorfplatz', 'online', ''],
        houseNumbers: ['1', '2', '4-8', '7', '8', '18', '13-15', '30-40', '32', '34', '35', '39', '44/46', '70', '100', '116-122', '146', '230', '300', '595', '387', '579', 'online', ''],
        currencies: ['EUR', 'RUB'],
        payMethods: ['EC card', 'Cash', 'N26 card', 'PayPal', 'Amazon VISA']
    };
    const addBuy = () => {
        const buyToAdd = JSON.parse(JSON.stringify(state));
        saveBuy(buyToAdd)
            .then((result: boolean) => {
                if (result) {
                    console.log('Buy saved. Resetting Edit Panel...');
                    setState(initState);
                } 
            })
            .catch(function (err: Error) {
                console.log('Fetch Error :-S', err);
            });
    };
    let date = {
        get converted(): string {
            const currentDate = state.date;
            const normalizedDate = currentDate.split('.').reverse().join('-');
            console.log('get: ', state.date)

            return normalizedDate;
        },
        set convert(date: string) {
            console.log('set: ', date)
            const normalizedDate = date.split('-').reverse().join('.');
            setState({...state, date: normalizedDate});
        }
    };
 
    return ( 
        <div className="card buy-list__card--default">
            <div className="card-body">
                <div className="buy buy--default">
                    <form className="container-fluid">
                        <div className="row">
                            <div className="col buy-info">
                                <div className="buy-info__date-and-time">
                                    <input className="form-control buy-info__date" min="2018-11-01" value={date.converted} onChange={e => date.convert = e.target.value} required type="date" />
                                    <input className="form-control buy-info__time" value={state.time} onChange={e => setState({...state, time: e.target.value})} type="time" />
                                </div>
                                <div className="buy-info__address">
                                    <select className="form-control custom-select buy-info__country" value={state.address.country} onChange={e => setState({
                                            ...state, 
                                            address: {...state.address, country: e.target.value }
                                        })}>
                                        { StaticValueCollection.countries.map(country => <option value={country} key={country}>{country}</option>) }
                                    </select>
                                    <select className="form-control custom-select buy-info__shop-name" value={state.shopName} onChange={e => setState({
                                            ...state, 
                                            shopName: e.target.value
                                        })}>
                                        { StaticValueCollection.shopNames.map(shopName => <option value={shopName} key={shopName}>{shopName}</option>) }
                                    </select>
                                    <select className="form-control custom-select buy-info__index" value={state.address.index} onChange={e => setState({
                                            ...state, 
                                            address: {...state.address, index: e.target.value}
                                        })}>
                                        { StaticValueCollection.indexes.map(index => <option value={index} key={index}>{index}</option>) }
                                    </select>
                                    <select className="form-control custom-select buy-info__city" value={state.address.city} onChange={e => setState({
                                            ...state, 
                                            address: {...state.address, city: e.target.value}
                                        })}>
                                        { StaticValueCollection.cities.map(city => <option value={city} key={city}>{city}</option>) }
                                    </select>
                                    <select className="form-control custom-select buy-info__street" value={state.address.street} onChange={e => setState({
                                            ...state, 
                                            address: {...state.address, street: e.target.value}
                                        })}>
                                        { StaticValueCollection.streets.map(street => <option value={street} key={street}>{street}</option>) }
                                    </select>
                                    <select className="form-control custom-select buy-info__houseNumber" value={state.address.houseNumber} onChange={e => setState({
                                            ...state, 
                                            address: {...state.address, houseNumber: e.target.value}
                                        })}>
                                        { StaticValueCollection.houseNumbers.map(houseNumber => <option value={houseNumber} key={houseNumber}>{houseNumber}</option>) }
                                    </select>
                                </div>
                                <select className="form-control custom-select buy-info__currency" value={state.currency} onChange={e => setState({
                                            ...state, 
                                            currency: e.target.value
                                        })}>
                                    {StaticValueCollection.currencies.map(currency => <option value={currency} key={currency}>{currency}</option>)}
                                </select>
                                <select className="form-control custom-select buy-info__pay-method" value={state.payMethod} onChange={e => setState({
                                    ...state,
                                    payMethod: e.target.value
                                })}>
                                    {StaticValueCollection.payMethods.map(payMethod => <option value={payMethod} key={payMethod}>{payMethod}</option>)}
                                </select >
                                <div className="buy-info__buttons">
                                    <button className="btn btn-primary btn-md buy-info__btn-add" onClick={addBuy}>Add buy</button>
                                </div >
                            </div >
                        </div >
                    </form>
                </div >
            </div >
        </div >
    )
}