import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Menu from "../common/components/menu/Menu";
import MenuButton from "../common/components/UI/buttons/MenuButton";
import Dialog from "../common/components/UI/dialog/Dialog";
import Toast from "../common/components/UI/toast/Toast";
import { mapCenterChanged } from "../features/map/mapSlice";
import MapWrapper from "../features/map/MapWrapper";
import { selectUi, uiActions } from "../features/map/uiSlice";

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

            <Toast />
            
            <Dialog />
        </>
    )
}

export default MainLayout;