import React, {useCallback, useEffect, useState} from 'react';
import L from 'leaflet';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import { mapCenterChanged, selectMap } from './mapSlice';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { useParams } from 'react-router-dom';

const MapWrapper = () => {
    const dispatch = useDispatch();
    const [map, setMap] = useState<L.Map>();
    const params = useParams();
    const mapState = useSelector(selectMap);

    const mapRef = useCallback((mapElement: HTMLDivElement) => {
        if (mapElement !== null && !map) {
            
            setMap(new L.Map(mapElement, {
                center: mapState.mapCenter,
                zoom: mapState.mapSettings.initZoom,
                zoomControl: false
            }));

        }
    }, [map, mapState]);

    useEffect(() => {
        if (map) {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }
    }, [map]);

    useEffect(() => {
        if (params.coordinates) {
            const [lat, lng] = params.coordinates.split(',');
            dispatch(mapCenterChanged({lat, lng}));
        }
    }, [dispatch, params.coordinates])

    const handleLocateClick = () => {
        /**
         * TODO: Think about timeout!
         */
        map!.locate({setView: true, maxZoom: 15});
    }

    return (
        <>
            <div ref={mapRef} className="h-screen">
                <Map map={map}/>
            </div>
        </>
    )
}

export default MapWrapper;