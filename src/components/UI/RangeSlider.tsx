import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectMap} from '../../store/mapSlice';

type RangeSliderProp = {
    onRangeChange: (rangeValue: number) => void,
}

const RangeSlider = ({onRangeChange}: RangeSliderProp) => {

    const mapState = useSelector(selectMap);
    const [rangeValue, setRangeValue] = useState<number>(mapState.venueRadius);

    const handleRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
        onRangeChange(event.currentTarget.valueAsNumber);
        setRangeValue(event.currentTarget.valueAsNumber);
    }

    return (
        <div className="mt-4 px-4">
            <label className="block w-full text-right text-sm text-slate-400">
                Suchradius: {new Intl.NumberFormat().format(rangeValue)} m
            </label>
            <input type="range" list="tickmarks"
                   min={mapState.mapSettings.radiusMin}
                   max={mapState.mapSettings.radiusMax}
                   step="1000"
                   value={rangeValue}
                   onChange={handleRangeChange}
                   className="range-slider w-full mt-2"/>
        </div>
    )
}

export default RangeSlider;