import './BuyList.scss';
import BuyInfo from '../../../types/BuyInfo';

interface Props {
  buys: BuyInfo[] | undefined
}

export const BuyList: React.FC<Props> = ({ buys = [] }) => {
  return (
    <>
      <h3>Buy List</h3>
      <ul className="buy-section__list buy-list">
        {
          buys && buys.map((buy: BuyInfo) => (
            <li className="buy-list__buy" key={buy.date + buy.time}>
              <p>Buy {buy.date + ' : ' + buy.time}</p>
            </li>
          ))
        }
      </ul>
    </>
  )
}
