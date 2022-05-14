import React, {useState} from 'react';
import Search from '../components/Search/Search';
import FabButton from '../components/UI/buttons/FabButton';
import Teaser from '../components/Teaser/Teaser';
import Filter from '../components/Filter/Filter';
import {useParams} from "react-router-dom";
import L from 'leaflet';
import Icon from '../components/UI/Icon';
import MapOverlay from '../components/Map/MapOverlay';
import MapWrapper from '../components/Map/MapWrapper';
import RangeSlider from '../components/UI/RangeSlider';
import {ICONS} from '../constants/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {selectUi, uiActions} from '../store/uiSlice';
import {mapCenterChanged, venueRadiusChanged} from '../store/mapSlice';

const Home = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    const params = useParams();
    //const supabaseUrl = useSupabaseUrl();

    if (params.latLng) {
        const latLng: string[] = params.latLng.split(',');
        const lat = parseFloat(latLng[0]);
        const lng = parseFloat(latLng[1]);

        dispatch(mapCenterChanged(new L.LatLng(lat, lng)));
    }

    const handleSearchResultClick = (coordinates: L.LatLng) => {
        dispatch(mapCenterChanged(coordinates));
        dispatch(uiActions.allHidden());
    }

    return (

        <div className="relative">

            <MapWrapper/>

            <div className="fixed top-5 flex justify-center w-full z-800">
                <Search/>
            </div>

            <div className="fixed bottom-24 right-2 z-800">
                <FabButton backgroundColor="bg-green-200"
                           onFabButtonClick={() => dispatch(uiActions.filterShown())}>
                    <Icon icon={ICONS.FILTER}/>
                </FabButton>
            </div>

            <MapOverlay isShowing={ui.isFilterShowing}
                        onCloseMapOverlay={() => dispatch(uiActions.filterHidden())}>
                <div className="my-4 p-4">
                    <Filter/>
                    <RangeSlider onRangeChange={(rangeValue) => dispatch(venueRadiusChanged(rangeValue))}/>
                </div>
            </MapOverlay>

            <MapOverlay isShowing={ui.isTeaserShowing}
                        onCloseMapOverlay={() => dispatch(uiActions.teaserHidden())}>
                <div className="my-4">
                    <Teaser venueId={ui.teaserVenueId}/>
                </div>
            </MapOverlay>
        </div>

    )
}

export default Home;