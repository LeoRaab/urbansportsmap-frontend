import React from 'react';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/use-auth';
import { uiActions } from '../../../features/map/uiSlice';
import { selectUserId } from '../../../features/user/authSlice';
import Button from '../form-elements/buttons/Button';

type MenuProps = {
    isShowing: boolean
}

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
        dispatch(uiActions.menuHidden());
        navigate('/login');
    }

    const handleSignupClick = () => {
        dispatch(uiActions.menuHidden());
        navigate('/signup');
    }

    const handleLogoutClick = () => {
        logout();
        dispatch(uiActions.menuHidden());
        navigate('/');

    }

    return (
        <aside className="relative">
            <div
                className={'fixed h-screen flex flex-col w-3/4 lg:w-1/4 bg-white/95 z-1080 shadow-2xl border-slate-200 border-r transition duration-500 ' + menuClass}>

                <div className="flex flex-col w-full">

                    <MenuItem destination={'/'}
                        text={'Home'}
                        icon={ICONS.MAP} />

                    {userId &&
                        <>
                            <MenuItem destination={'/favorites'}
                                text={'Favoriten'}
                                icon={ICONS.HEART_FILLED} />

                            <MenuItem destination={'/profile'}
                                text={'Profile'}
                                icon={ICONS.USER} />

                            <MenuItem destination={'/settings'}
                                text={'Settings'}
                                icon={ICONS.SETTINGS} />
                        </>
                    }

                </div>


                <div className="flex justify-center my-8">
                    {!userId &&
                        <>
                            <div className="m-2 w-1/2">
                                <Button color="secondary" type="button" onClick={handleLoginClick}>
                                    Log in
                                </Button>
                            </div>

                            <div className="m-2 w-1/2">
                                <Button color="primary" type="button" onClick={handleSignupClick}>
                                    Sign up
                                </Button>
                            </div>
                        </>
                    }
                    {userId &&
                        <>
                            <div className="m-2 w-1/2">
                                <Button color="secondary" type="button" onClick={handleLogoutClick}>
                                    Log out
                                </Button>
                            </div>
                        </>
                    }
                </div>

            </div>
        </aside>
    )
}

export default Menu;