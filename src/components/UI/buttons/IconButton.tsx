import React from 'react';
import Icon from '../Icon';
import {CustomIcon} from '../../../types/CustomIcon';

type PrimaryButtonProps = {
    text: string,
    icon: CustomIcon,
    color?: string | 'text-black'
    handleOnClick: () => void
}

const IconButton = ({text, icon, color, handleOnClick}: PrimaryButtonProps) => {

    return (
        <button className={"flex items-center w-fit " + color} onClick={handleOnClick}>
            <Icon icon={icon}/>
            <p className="ml-2">{text}</p>
        </button>
    )
}

export default IconButton;