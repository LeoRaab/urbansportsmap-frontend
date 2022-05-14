import React from 'react';

type DeleteButtonProps = {
    text: string,
    handleOnClick: () => void
}

const DeleteButton = ({text, handleOnClick}: DeleteButtonProps) => {

    return (
        <button onClick={handleOnClick}
                className="text-sm text-red-400 ml-2">
            {text}
        </button>
    )
}

export default DeleteButton;