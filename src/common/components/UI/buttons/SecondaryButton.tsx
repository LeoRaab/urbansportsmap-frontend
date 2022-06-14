import React from 'react';

type SecondaryButtonProps = {
    text: string,
    handleOnClick: () => void;
}

const SecondaryButton = ({text, handleOnClick}: SecondaryButtonProps) => {

    return (
        <button
            className="bg-slate-100 rounded-sm hover:bg-slate-200 shadow p-3 w-full font-bold"
            onClick={handleOnClick}>
            {text}
        </button>
    )
}

export default SecondaryButton;