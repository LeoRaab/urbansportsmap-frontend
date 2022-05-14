import React, {useEffect, useRef} from 'react';
import L, {LeafletMouseEvent} from 'leaflet';
import {VenueMarker} from '../../types/VenueMarker';
import Venue from '../../types/Venue';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilters} from '../../store/filterSlice';
import {uiActions} from '../../store/uiSlice';
import {selectMap} from '../../store/mapSlice';
import {useGetVenuesQuery} from '../../store/api/venuesApi';
import {markerIconFactory} from '../../util/marker-icon-factory';
import LoadingSpinner from '../UI/LoadingSpinner';
import {hasVenueSportType} from '../../util/has-venue-sport-type';
import Modal from '../UI/Modal';

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
                <Modal>
                    <LoadingSpinner/>
                </Modal>
            }
        </>
    )
}

export default Markers;