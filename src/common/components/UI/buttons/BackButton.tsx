import React from 'react';
import Icon from '../Icon';
import {ICONS} from '../../../constants/Icons';

type BackButtonProps = {
    handleOnClick: () => void;
}

const BackButton = ({handleOnClick}: BackButtonProps) => {

    return (
        <button onClick={handleOnClick}>
            <Icon icon={ICONS.BACK}/>
        </button>
    )
}

export default BackButton;