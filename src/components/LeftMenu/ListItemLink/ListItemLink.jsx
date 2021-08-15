
import { useState } from 'react';
import classNames from 'classnames';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import './ListItemLink.scss';
import PropTypes from 'prop-types';

function ListItemLink(props) {
    const { date, count, isSelected, chooseDate } = props;
    const [isLoading, setLoadingStatus] = useState(false);

    const elementClassNames = classNames([
        'vertical-menu__item-link',
        {
            'vertical-menu__item-link--active': isSelected,
            'vertical-menu__item-link--loading': isLoading
        }
    ]);

    return (
        <a className={elementClassNames} onClick={selectDate(date)} aria-current="page" href="/">
            <ListItemIcon 
                component="span" 
                classes={{root: 'vertical-menu__item-icon-wrapper'}}>
                <ShoppingCartOutlinedIcon 
                    color="action" 
                    className="feather feather-shopping-cart vertical-menu__item-icon"
                />
            </ListItemIcon>
            <span className="vertical-menu__count-icon">{count}</span>
            {/* fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> */}
            <span className="vertical-menu__item-text">{date}</span>
        </a>
    );

    function selectDate(date) {
        return (event) => {
            event.preventDefault();
            setLoadingStatus(true);
            chooseDate(date);
            console.log(date);
        };
    }
}

ListItemLink.propTypes = {
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    chooseDate: PropTypes.func.isRequired
};

export default ListItemLink;