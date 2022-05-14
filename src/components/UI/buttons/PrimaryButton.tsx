import React from 'react';

type PrimaryButtonProps = {
    text: string,
    handleOnClick: () => void
}

const PrimaryButton = ({text, handleOnClick}: PrimaryButtonProps) => {

    return (
        <button
            className="bg-green-200 rounded-sm shadow hover:bg-green-100 p-3 w-full font-bold"
            onClick={handleOnClick}>
            {text}
        </button>
    )
}

export default PrimaryButton;