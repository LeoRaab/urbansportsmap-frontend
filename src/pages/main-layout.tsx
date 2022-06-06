import React from "react";
import { Outlet, useParams } from "react-router-dom";
import MapWrapper from '../components/Map/MapWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { mapCenterChanged } from '../store/mapSlice';

const MainLayout = () => {

    const dispatch = useDispatch();
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