import L, {LeafletMouseEvent, LocationEvent} from 'leaflet';
import React, {useEffect} from 'react';
import Markers from './Markers';
import Circle from './Circle';
import {useDispatch, useSelector} from 'react-redux';
import { LocationMarker } from '../../common/constants/marker-icon-images';
import { selectMap, mapCenterChanged } from './mapSlice';
import { uiActions } from '../../common/components/UI/uiSlice';

type MapProps = {
    map?: L.Map
}

const Map = ({map}: MapProps) => {
    const dispatch = useDispatch();
    const mapState = useSelector(selectMap);

    useEffect(() => {

        if (map) {                
            const locationMarkerLayer = new L.LayerGroup();

            //have to set mapCenter manually instead of using getCenter()
            //getCenter() returns Position before click -> that's not the new center we want
            const handleMapClick = (event: LeafletMouseEvent) => {
                map.setView(event.latlng);
                dispatch(mapCenterChanged({
                    coordinates: event.latlng.toString()
                }));
                dispatch(uiActions.allHidden());
            }

            const handleDragEnd = () => {
                dispatch(mapCenterChanged({
                    coordinates: map.getCenter().toString()
                }));
            }

            const handleLocationFound = (event: LocationEvent) => {
                locationMarkerLayer.clearLayers();
                locationMarkerLayer.addLayer(new L.Marker(event.latlng, {icon: LocationMarker}));
                dispatch(mapCenterChanged({
                    coordinates: event.latlng.toString()
                }));
            }

            map.on('click', (event: LeafletMouseEvent) => handleMapClick(event));
            map.on('dragend', handleDragEnd);
            map.on('locationfound', (event: LocationEvent) => handleLocationFound(event));

            map.addLayer(locationMarkerLayer);
        }

        return () => {
            if (map) {
                map.remove();
            }
        }

    }, [dispatch, map]);

    useEffect(() => {
        if (map) {
            map.setView(mapState.mapCenter);
        }
    }, [map, mapState.mapCenter])

    return (
        <>
            <Circle map={map}/>
            <Markers map={map}/>
        </>
    )
}

export default Map;