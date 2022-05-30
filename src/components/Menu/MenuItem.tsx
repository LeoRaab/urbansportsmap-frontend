import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from '../UI/Icon';
import {CustomIcon} from '../../types/CustomIcon';
import {uiActions} from '../../store/uiSlice';
import {useDispatch} from 'react-redux';

type MenuItemProps = {
    destination: string,
    text: string,
    icon: CustomIcon
}

const MenuItem = ({destination, text, icon}: MenuItemProps) => {
    const dispatch = useDispatch();

    return (
        <NavLink to={destination} onClick={() => dispatch(uiActions.menuHidden())}>
            <div className="flex items-center w-full border-slate-100 border-b px-4 py-8">
                <Icon icon={icon}/>
                <p className="text-xl ml-8">{text}</p>
            </div>
        </NavLink>
    );
}

export default MenuItem;