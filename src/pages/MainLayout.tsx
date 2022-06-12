import React from "react";
import { Outlet, useParams } from "react-router-dom";
import MapWrapper from '../components/Map/MapWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { mapCenterChanged } from '../store/mapSlice';
import Menu from "../components/Menu/Menu";
import MenuButton from "../components/UI/buttons/MenuButton";
import { selectUi, uiActions } from "../store/uiSlice";
import Dialog from "../components/UI/Dialog/Dialog";

const MainLayout = () => {
    const ui = useSelector(selectUi);
    const dispatch = useDispatch();
    const params = useParams();

    if (params.latLng) {
        const latLng: string[] = params.latLng.split(',');
        const lat = parseFloat(latLng[0]);
        const lng = parseFloat(latLng[1]);

        dispatch(mapCenterChanged({ lat, lng }));
    }

    const handleMenuButtonClick = () => {
        dispatch(uiActions.menuToggle());
    }

    const handleMainClick = () => {
        dispatch(uiActions.menuHidden());
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-7 right-0 z-1080">
                    <MenuButton isShowing={ui.isMenuShowing} onMenuButtonClick={handleMenuButtonClick} />
                </div>

                <Menu isShowing={ui.isMenuShowing} />

                <div onClick={handleMainClick}>
                    <Outlet />

                    <MapWrapper />
                </div>
            </div>

            <Dialog />
        </>
    )
}

export default MainLayout;