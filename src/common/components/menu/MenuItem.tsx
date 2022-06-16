import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { uiActions } from '../UI/uiSlice';

type MenuItemProps = {
    destination: string,
    text: string,
    icon: JSX.Element
}

const MenuItem = ({destination, text, icon}: MenuItemProps) => {
    const dispatch = useDispatch();

    return (
        <NavLink to={destination} onClick={() => dispatch(uiActions.menuHidden())}>
            <div className="flex items-center w-full border-slate-100 border-b px-4 py-8">
                {icon}
                <p className="text-xl ml-8">{text}</p>
            </div>
        </NavLink>
    );
}

export default MenuItem;