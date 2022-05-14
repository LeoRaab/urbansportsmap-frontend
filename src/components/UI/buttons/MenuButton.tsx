import React from 'react';
import Icon from '../Icon';
import {ICONS} from '../../../constants/Icons';

type MenuButtonProps = {
    isShowing: boolean,
    onMenuButtonClick: () => void
}

const MenuButton = ({isShowing, onMenuButtonClick}: MenuButtonProps) => {

    let icon = ICONS.MENU;

    if (isShowing) {
        icon = ICONS.CLOSE;
    }

    return (
        <button onClick={onMenuButtonClick} className="bg-white rounded p-2 shadow-md">
            <Icon icon={icon}/>
        </button>
    )
}

export default MenuButton;