
function BuyList(props) {

    // console.log('setLoadingDate: ', setLoadingDate);

    return (
        <div class="buy-list">
            {/* <buy :buy="emptyBuy" isDefault /> */}
            <ul class="list-group list-group-flush buy-list__items">
            {/* <buy v-for="(buy, i) in dateBuys" 
                :buy="buy" 
                @save-product="(event) => $attrs.onSaveProduct(constructProductDataForIdentification(buy.date, buy.time, event))" 
                @remove-product="(event) => $attrs.onRemoveProduct(constructProductDataForIdentification(buy.date, buy.time, event))" 
                :key="buy.date + Date.now() + i" 
            /> */}
            </ul>
        </div>
    );
}
export default BuyList;