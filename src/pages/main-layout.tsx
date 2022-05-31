import React, { useState } from 'react';
import Search from '../components/Search/Search';
import FabButton from '../components/UI/buttons/FabButton';
import Teaser from '../components/Teaser/Teaser';
import Filter from '../components/Filter/Filter';
import { Outlet, useParams } from "react-router-dom";
import L from 'leaflet';
import Icon from '../components/UI/Icon';
import MapOverlay from '../components/Map/MapOverlay';
import MapWrapper from '../components/Map/MapWrapper';
import RangeSlider from '../components/UI/RangeSlider';
import { ICONS } from '../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiActions } from '../store/uiSlice';
import { mapCenterChanged, venueRadiusChanged } from '../store/mapSlice';

const MainLayout = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    const params = useParams();

    if (params.latLng) {
        const latLng: string[] = params.latLng.split(',');
        const lat = parseFloat(latLng[0]);
        const lng = parseFloat(latLng[1]);

        dispatch(mapCenterChanged({ lat, lng }));
    }

    return (
        <div className="relative">

            <Outlet />

            <MapWrapper />
        </div>
    )
}

export default MainLayout;