import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Buy.scss';
import BuyInfo from '../../../../types/BuyInfo';

interface Props {
  buy: BuyInfo,
  removeBuy: (buy: BuyInfo) => boolean | void
}

export const Buy: React.FC<Props> = ({ buy = {} as BuyInfo, removeBuy }) => {
  const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => removeBuy(buy);
  const header = ( 
    <div className="buy__caption"> 
      {buy.time}, {buy.address?.country} {buy.address?.index} {buy.address?.city} {buy.address?.street} {buy.address?.houseNumber}, {buy.shopName} - {buy.payMethod} - {buy.currency}
      <button className="btn btn--icon-remove" onClick={remove}></button>
    </div>
  );

  return (
    <div className="buy">
        <DataTable value={buy.products} header={header} className="buy__table" stripedRows size="small" responsiveLayout="scroll">
          <Column field="" header="#"></Column>
          <Column headerClassName="FFFGGG" field="name" header="Name"></Column>
          <Column field="price" header="Price"></Column>
          <Column field="weightAmount" header="Weight/Amount"></Column>
          <Column field="measure" header="Measure"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="discount" header="Discount"></Column>
          <Column field="Actions" header="Actions"></Column>
        </DataTable>
      </div>
  )
}