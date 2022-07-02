import React, {useEffect, useRef} from 'react';
import L, {LeafletMouseEvent} from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { VenueMarker } from '../../common/types/VenueMarker';
import { markerIconFactory } from '../../common/util/marker-icon-factory';
import { uiActions } from '../../common/components/UI/uiSlice';
import { selectVisibleVenues } from './venuesSlice';

type MarkersProps = {
    map?: L.Map
}

const Markers = ({map}: MarkersProps) => {    
    const dispatch = useDispatch();
    const venues = useSelector(selectVisibleVenues);
    const markerLayer = useRef<L.LayerGroup>(new L.LayerGroup());

    useEffect(() => {

        if (map && venues) {

            const handleMarkerClick = (event: LeafletMouseEvent) => {
                dispatch(
                    uiActions.teaserShown(event.target.options.venue.id)
                );
            }

            const marker = venues
                .map(venue => {
                    const markerIcon = markerIconFactory(venue.sportTypes);
                    const marker = new VenueMarker(venue.location, {venue: venue, icon: markerIcon});

                    marker.on('click', handleMarkerClick);
                    return marker;
                });

            map.removeLayer(markerLayer.current);
            markerLayer.current = new L.LayerGroup(marker);
            map.addLayer(markerLayer.current);
        }

    }, [dispatch, map, venues])

    return (
        <></>
    )
}

export default Markers;