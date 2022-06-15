import React from 'react';
import Icon from '../Icon';
import { CustomIcon } from '../../../types/CustomIcon';
import Button from '../../form-elements/Button';

type PrimaryButtonProps = {
    text: string,
    icon: JSX.Element,    
    onClick: () => void
}

const IconButton = ({ text, icon, onClick }: PrimaryButtonProps) => {

    return (
        <Button color="transparent" type="button" onClick={onClick}>
            <div className="flex items-center">
                {icon}
                <p>{text}</p>
            </div>
        </Button>
    )
}

export default IconButton;