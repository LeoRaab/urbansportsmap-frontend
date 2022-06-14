import React, {useEffect, useRef} from 'react';
import L, {LeafletMouseEvent} from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import Venue from '../../common/types/Venue';
import { VenueMarker } from '../../common/types/VenueMarker';
import { hasVenueSportType } from '../../common/util/has-venue-sport-type';
import { markerIconFactory } from '../../common/util/marker-icon-factory';
import { selectFilters } from '../filter/filterSlice';
import { selectMap } from './mapSlice';
import { uiActions } from './uiSlice';
import { useGetVenuesQuery } from './venuesApi';

type MarkersProps = {
    map?: L.Map
}

const Markers = ({map}: MarkersProps) => {
    const {data: venues, isLoading, isFetching, isError, error} = useGetVenuesQuery();
    const markerLayer = useRef<L.LayerGroup>(new L.LayerGroup());
    const filters = useSelector(selectFilters);
    const mapState = useSelector(selectMap);
    const dispatch = useDispatch();

    if (isError) {
        console.log(error);
    }

    useEffect(() => {

        if (map && venues) {

            const isVenueInRadius = (venue: Venue): boolean => {
                const distanceVenueToCenter = map.distance(venue.location, mapState.mapCenter);
                return distanceVenueToCenter <= mapState.venueRadius;
            }

            const handleMarkerClick = (event: LeafletMouseEvent) => {
                dispatch(
                    uiActions.teaserShown(event.target.options.venue.id)
                );
            }

            const marker = venues
                .filter(venue => {
                    return isVenueInRadius(venue);
                })
                .filter(venue => {
                    if (filters.selectedFilters.length > 0) {
                        return hasVenueSportType(venue, filters.selectedFilters);
                    }

                    return true;
                })
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

    }, [dispatch, filters, map, mapState.mapCenter, mapState.venueRadius, venues])

    return (
        <>
            {(isLoading || isFetching) &&
                <LoadingSpinner/>
            }
        </>
    )
}

export default Markers;