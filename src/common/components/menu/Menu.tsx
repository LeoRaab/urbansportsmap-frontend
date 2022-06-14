import React from 'react';
import MenuItem from './MenuItem';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import { ICONS } from '../../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import { selectUserId } from '../../store/authSlice';
import useAuth from '../../hooks/use-auth';

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
                                <SecondaryButton text={'Log in'} handleOnClick={handleLoginClick} />
                            </div>

                            <div className="m-2 w-1/2">
                                <PrimaryButton text={'Sign up'} handleOnClick={handleSignupClick} />
                            </div>
                        </>
                    }
                    {userId &&
                        <>
                            <div className="m-2 w-1/2">
                                <SecondaryButton text={'Log out'} handleOnClick={handleLogoutClick} />
                            </div>
                        </>
                    }
                </div>

            </div>
        </aside>
    )
}

export default Menu;