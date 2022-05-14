import CloseButton from '../UI/buttons/CloseButton';
import React from 'react';

type MapOverlayProps = {
    isShowing: boolean,
    onCloseMapOverlay: () => void,
    children: React.ReactNode
}

const MapOverlay = ({isShowing, onCloseMapOverlay, children}: MapOverlayProps) => {
    let menuClass = 'translate-y-full';

    if (isShowing) {
        menuClass = 'translate-y-0';
    }

    return (
        <div className={`fixed bottom-0 flex justify-center w-full z-1000 transition duration-500 ${menuClass}`}>
            <div className={`bg-white w-full lg:w-3/4 rounded border-t-slate-200 border-t-8 border-l-2 border-r-2 py-4 relative`}>
                <div className="absolute top-5 right-3 z-1000">
                    <CloseButton handleOnClick={onCloseMapOverlay}/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MapOverlay;