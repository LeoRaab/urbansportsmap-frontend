import React from 'react';

type SubmitButtonProps = {
    text: string
}

const SubmitButton = ({text}: SubmitButtonProps) => {

    return (
        <button
            className="bg-green-200 rounded-sm shadow hover:bg-green-100 p-3 w-full font-bold"
            type="submit">
            {text}
        </button>
    )
}

export default SubmitButton;