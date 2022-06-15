import React, {useCallback, useEffect, useState} from 'react';
import L from 'leaflet';
import Map from './Map';
import { useSelector } from 'react-redux';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import { ICONS } from '../../common/constants/Icons';
import { selectMap } from './mapSlice';
import Icon from '../../common/components/UI/Icon';

const MapWrapper = () => {
    const [map, setMap] = useState<L.Map>();
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
    }, [map])

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

            <div className="relative">
                <div className="fixed bottom-6 lg:top-3/4 right-2 z-800">
                    <FabButton backgroundColor="bg-amber-200"
                               onFabButtonClick={handleLocateClick}>
                        <Icon icon={ICONS.LOCATION}/>
                    </FabButton>
                </div>
            </div>
        </>
    )
}

export default MapWrapper;