import './BuyList.scss';
import BuyInfo from '../../../types/BuyInfo';
import { Buy } from './Buy/Buy';

interface Props {
  buys: BuyInfo[] | undefined,
  removeBuy: (buy: BuyInfo) => any
}

export const BuyList: React.FC<Props> = ({ buys = [], removeBuy }) => {
  return (
      <div className="buy-list-wrapper">
      <ul className="buy-list">
        {
          buys && buys.map((buy: BuyInfo) => (
            <li className="buy-list__item" key={buy.date + buy.time}>
              <Buy buy={buy} removeBuy={removeBuy} />
            </li>
          ))
        }
      </ul>
      </div>
  )
}