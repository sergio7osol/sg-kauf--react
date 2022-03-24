import './BuySection.scss';
import DetailedDateInfo from '../../types/DetailedDateInfo';
import { BuyList } from './BuyList/BuyList';

interface Props {
    activeDate: DetailedDateInfo
}

export const BuySection: React.FC<Props> = ({ activeDate = {} }) => {
    return (
        <div className="buy-section">
            <h3>Buy Section</h3>
            <p>{activeDate?.buys?.length}</p>
            <BuyList buys={activeDate.buys} />
        </div>
    )
}