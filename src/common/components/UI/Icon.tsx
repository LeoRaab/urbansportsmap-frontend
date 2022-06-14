import React from 'react';
import {CustomIcon} from '../../types/CustomIcon';

type IconProps = {
    icon: CustomIcon,
}

const Icon = ({icon}: IconProps) => {
    const path = icon.path.map((path, key) => {
        return <path key={key} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path}/>
    });

    return (
        <>
            {!icon.filled &&
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    {path}
                </svg>
            }
            {icon.filled &&
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    {path}
                </svg>
            }
        </>
    )
}

export default Icon;