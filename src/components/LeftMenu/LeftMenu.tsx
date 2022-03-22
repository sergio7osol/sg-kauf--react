import { ReactComponent as ShoppingCartImage } from '../../assets/images/shopping-cart.svg';
import { useState } from 'react';
import { SearchBox } from './SearchBox/SearchBox';
import './LeftMenu.scss'; 
import DetailedDateInfo from '../../types/DetailedDateInfo';

interface Props {
    items: DetailedDateInfo[];
    activeItem: DetailedDateInfo;
    loadingItem: string;
    chooseItem: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: DetailedDateInfo) => void;
}

export const LeftMenu: React.FC<Props> = ({ items = [], activeItem = {}, loadingItem = '', chooseItem }) => {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<DetailedDateInfo[]>([]);

    const countProducts = (date: DetailedDateInfo): number => {
        if (date.count) {
            return date.count;
        }
        let productQuantity: number | undefined = date?.buys?.reduce((quantity, buy) => {
            if (buy.products && buy.products.length) {
                quantity += buy.products.length;
            }
            return quantity;
        }, 0);
        productQuantity = productQuantity === undefined ? 0 : productQuantity;
        return productQuantity;
    };

    const onSearchItems = (query: string): void => {
        const foundItems: DetailedDateInfo[] = query.trim() === '' 
            ? items 
            : items.filter(item => item.date.includes(query));
        setQuery(query);
        setFilteredItems(foundItems);
    };

    console.log('filteredItems ', filteredItems);

    return (
        <nav id="sidebarMenu" className="vertical-menu">
            {/* <SortBox :active-sort-order="sortOrder" @sort-order="changeSortOrder($event)" /> */}
            <div className="vertical-menu__search">
                <SearchBox searchValue={query} searchCallback={query => onSearchItems(query) } />
            </div>
            <ul className="vertical-menu__list">
                {
                    (!filteredItems.length ? items : filteredItems) // TODO: find out - why filteredItems are not initially shown
                        .map((item: DetailedDateInfo) => (
                            <li className="nav-item vertical-menu__list-item" key={item.date + item.count}>
                                <a className={`
                                        vertical-menu__item-link 
                                        ${item.date === activeItem.date ? 'vertical-menu__item-link--active' : ''}
                                        ${item.date === loadingItem ? 'vertical-menu__item--loading' : ''}
                                    `}
                                    href="/"
                                    onClick={(e) => chooseItem(e, item)}
                                >
                                    <span className="vertical-menu__count-icon">{countProducts(item)}</span>
                                    <ShoppingCartImage />
                                    <span className="vertical-menu__item-text">{item.date}</span>
                                </a>
                            </li>
                        ))
                }
            </ul>
        </nav >
    );
}
