import React from 'react';

type ChipProps = {
    text: string,
    bgColor: string,
    isClickable: boolean,
    id?: number,
    fontColor?: string,
    onChipClick?: (id?: number) => void
}

const Chip = ({text, bgColor, fontColor, isClickable, id, onChipClick}: ChipProps) => {

    const handleChipClick = () => {
        if (onChipClick) {
            onChipClick(id);
        }
    }

    return (
        <div className="w-fit">
            <button className={'flex justify-between items-center rounded-sm py-2 px-4 shadow ' + bgColor}
                    onClick={handleChipClick}
                    disabled={!isClickable}>
                <p className={'text-sm font-semibold ' + (fontColor ? fontColor : 'text-slate-600')}>{text}</p>
            </button>
        </div>
    )
}

export default Chip;