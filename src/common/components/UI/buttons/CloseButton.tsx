import React from 'react';
import Icon from '../Icon';
import {ICONS} from '../../../constants/Icons';

type CloseButtonProps = {
    handleOnClick: () => void;
}

const CloseButton = ({handleOnClick}: CloseButtonProps) => {

    return (
        <button onClick={handleOnClick}>
            <Icon icon={ICONS.CLOSE}/>
        </button>
    )
}

export default CloseButton