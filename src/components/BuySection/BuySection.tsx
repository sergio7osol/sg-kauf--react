import './BuySection.scss';
import { BuyList } from './BuyList/BuyList';
import { ReactComponent as CalendarImage } from '../../assets/images/calendar.svg';
import DetailedDateInfo from '../../types/DetailedDateInfo';
import BuyInfo from '../../types/BuyInfo';

interface Props {
    activeDate: DetailedDateInfo,
    removeBuy: (buy: BuyInfo) => boolean | void
}

export const BuySection: React.FC<Props> = ({ activeDate = {}, removeBuy }) => {
    const startDragging = () => {
        console.log('I am beying dragged.');
    };
    return (
        <div className="buy-section">
            <h4 className="buy-section__date">
                <CalendarImage />
                {activeDate.date}
            </h4>
            <BuyList buys={activeDate.buys} removeBuy={removeBuy} />
        </div>
    )
}