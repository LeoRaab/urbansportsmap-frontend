import React from 'react';

type CardProps = {
    children: React.ReactNode;
}

const Card = ({children}: CardProps) => {
    return (
        <div className="w-full border border-slate-200 rounded-md p-4 shadow-sm">
            {children}
        </div>
    )
}

export default Card;