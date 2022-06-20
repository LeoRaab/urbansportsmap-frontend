import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Button from "../common/components/form-elements/buttons/Button";
import Menu from "../common/components/menu/Menu";
import Dialog from "../common/components/UI/dialog/Dialog";
import Toast from "../common/components/UI/toast/Toast";
import { mapCenterChanged } from "../features/map/mapSlice";
import MapWrapper from "../features/map/MapWrapper";
import { selectUi, uiActions } from "../common/components/UI/uiSlice";
import { MenuIcon, XIcon} from "@heroicons/react/outline";

const MainLayout = () => {
    const ui = useSelector(selectUi);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (params.coordinates) {
            try {
                const [latString, lngString] = params.coordinates.split(',');
                const lat = parseFloat(latString);                
                const lng = parseFloat(lngString);
                dispatch(mapCenterChanged({lat, lng}))
            } catch(e) {
                console.log(e);
            }
        }
    }, [dispatch, params.coordinates]);
    
    const handleMenuButtonClick = () => {
        dispatch(uiActions.menuToggle());
    }

    const handleMainClick = () => {
        dispatch(uiActions.menuHidden());
    }

    return (
        <>
            <div className="relative">
                
                <div className="fixed top-8 right-0 z-1080">
                    <Button color="white" type="button" onClick={handleMenuButtonClick}>
                        {!ui.isMenuShowing && <MenuIcon className="h-5 w-5"/>}
                        {ui.isMenuShowing && <XIcon className="h-5 w-5"/>}                        
                    </Button>
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