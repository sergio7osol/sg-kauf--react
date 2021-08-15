import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from './ListItemLink/ListItemLink';
import PropTypes from 'prop-types';

function LeftMenu(props) {
    const { dates, selectedDate, chooseDate } = props;

    return (
        <nav id="sidebarMenu" className="d-md-block sidebar collapse vertical-menu">
            <div className="pt-3 pb-3">
                <List className="vertical-menu__list">
                    {
                        dates?.map((item, index) => (
                            <ListItem button className="vertical-menu__item" tabIndex={index ? '' : 0} key={item.date}>
                                { !!item.year && <ListItemText primary={item.year} className="vertical-menu__item-year" /> }
                                { !!item.month && <ListItemText primary={item.month} className="vertical-menu__item-month" /> /* getMonthString()item.month} */ } 
                                { !!item.date && <ListItemLink date={item.date} count={item.count} isSelected={item.date === selectedDate} chooseDate={chooseDate} /> }
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

LeftMenu.propTypes = {
    dates: PropTypes.arrayOf(
        PropTypes.exact({
            date: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        })
    ),
    selectedDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    chooseDate: PropTypes.func.isRequired
};

export default LeftMenu;