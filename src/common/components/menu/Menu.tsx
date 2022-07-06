import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/use-auth';
import { uiActions } from '../UI/uiSlice';
import { selectUserId } from '../../../features/user/userSlice';
import MenuItem from './MenuItem';
import Button from '../form-elements/buttons/Button';
import { MapIcon, UserIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { STRINGS } from '../../constants/strings';

type MenuProps = {
  isShowing: boolean;
};

const Menu = ({ isShowing }: MenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userId = useSelector(selectUserId);

  let menuClass = '-translate-x-full';

  if (isShowing) {
    menuClass = 'translate-x-0';
  }

  const handleLoginClick = () => {
    dispatch(uiActions.hideMenu());
    navigate('/login');
  };

  const handleSignupClick = () => {
    dispatch(uiActions.hideMenu());
    navigate('/signup');
  };

  const handleLogoutClick = () => {
    logout();
    dispatch(uiActions.hideMenu());
    navigate('/');
  };

  return (
    <aside className="relative">
      <div
        className={
          'fixed h-screen flex flex-col w-3/4 lg:w-1/4 bg-white/95 z-1080 shadow-2xl border-slate-200 border-r transition duration-500 ' +
          menuClass
        }
      >
        <div className="flex flex-col w-full">
          <MenuItem destination={'/'} text={STRINGS.PAGE_HOME} icon={<MapIcon className="icon-size" />} />

          {userId && (
            <>
              <MenuItem
                destination={'/favorites'}
                text={STRINGS.PAGE_FAVORITES}
                icon={<HeartIcon className="icon-size" />}
              />

              <MenuItem
                destination={'/profile'}
                text={STRINGS.PAGE_PROFILE}
                icon={<UserIcon className="icon-size" />}
              />
            </>
          )}
        </div>

        <div className="flex justify-center my-8">
          {!userId && (
            <>
              <div className="m-2 w-1/2">
                <Button color="secondary" type="button" onClick={handleLoginClick}>
                  {STRINGS.BUTTON_LOGIN}
                </Button>
              </div>

              <div className="m-2 w-1/2">
                <Button color="primary" type="button" onClick={handleSignupClick}>
                  {STRINGS.BUTTON_SIGN_UP}
                </Button>
              </div>
            </>
          )}
          {userId && (
            <>
              <div className="m-2 w-1/2">
                <Button color="secondary" type="button" onClick={handleLogoutClick}>
                  {STRINGS.BUTTON_LOGOUT}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Menu;
