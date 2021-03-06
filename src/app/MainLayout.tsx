import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Button from '../common/components/form-elements/buttons/Button';
import Menu from '../common/components/menu/Menu';
import MapWrapper from '../features/map/MapWrapper';
import { selectUi, uiActions } from '../common/components/UI/uiSlice';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import useVenueCoordinates from '../common/hooks/use-venue-coordinates';

const MainLayout = () => {
  const ui = useSelector(selectUi);
  const dispatch = useDispatch();

  useVenueCoordinates();

  const handleMenuButtonClick = () => {
    dispatch(uiActions.toggleMenu());
  };

  const handleMainClick = () => {
    dispatch(uiActions.hideMenu());
  };

  return (
    <>
      <div className="relative">
        <div className="fixed top-8 right-0 z-1080">
          <Button color="white" type="button" onClick={handleMenuButtonClick}>
            {!ui.isMenuShowing && <MenuIcon className="h-5 w-5" />}
            {ui.isMenuShowing && <XIcon className="h-5 w-5" />}
          </Button>
        </div>

        <Menu isShowing={ui.isMenuShowing} />

        <div onClick={handleMainClick}>
          <Outlet />

          <MapWrapper />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
