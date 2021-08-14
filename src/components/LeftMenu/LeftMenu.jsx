import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from './ListItemLink/ListItemLink';

function LeftMenu(props) {
    const { dates, selectedDate } = props;
    const [loadingDate, setLoadingDate] = useState(false);

    console.log('setLoadingDate: ', setLoadingDate);

    return (
        <nav id="sidebarMenu" className="d-md-block sidebar collapse vertical-menu">
            <div className="pt-3 pb-3">
                <List className="vertical-menu__list">
                    {
                        dates?.map((item, index) => (
                            <ListItem button className="vertical-menu__item" tabIndex={index ? '' : 0} key={item.date}>
                                { !!item.year && <ListItemText primary={item.year} className="vertical-menu__item-year" /> }
                                { !!item.month && <ListItemText primary={item.month} className="vertical-menu__item-month" /> /* getMonthString()item.month} */ } 
                                { !!item.date && <ListItemLink date={item.date} count={item.count} isSelected={item.date === selectedDate} isLoading={item.date === loadingDate} /> }
                            </ListItem>
                            )
                        )
                    }
                </List>
            </div>
        </nav>
    );

    
    // function datesSortedUp() {

    // }
}
export default LeftMenu;