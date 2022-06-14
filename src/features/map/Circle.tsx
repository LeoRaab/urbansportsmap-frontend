import React, {useRef} from 'react';
import L from 'leaflet';
import {useSelector} from 'react-redux';
import {selectMap} from '../../store/mapSlice';

type MarkerProps = {
    map?: L.Map
}

const Circle = ({map}: MarkerProps) => {
    const mapState = useSelector(selectMap);
    const circleLayer = useRef<L.LayerGroup>(new L.LayerGroup());

    if (map) {
        map.addLayer(circleLayer.current);
    }

    circleLayer.current.clearLayers();

    const radiusCircle = new L.Circle(mapState.mapCenter,
        {
            color: mapState.mapSettings.radiusColor,
            weight: 1,
            opacity: 0.8,
            radius: mapState.venueRadius
        });

    circleLayer.current.addLayer(radiusCircle);

    return (
        <></>
    )
}

export default Circle;