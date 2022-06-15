import React from 'react';
import Button from './Button';

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