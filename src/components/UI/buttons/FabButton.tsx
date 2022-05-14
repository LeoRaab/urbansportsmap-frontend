import React, {ReactNode} from 'react';

type FabButtonProps = {
    backgroundColor: string,
    children: ReactNode,
    onFabButtonClick: () => void;
}

const FabButton = ({backgroundColor, children, onFabButtonClick}: FabButtonProps) => {
    return (
        <button onClick={onFabButtonClick} className={backgroundColor + " rounded-full p-4 shadow-lg"}>
            {children}
        </button>
    )
}

export default FabButton;