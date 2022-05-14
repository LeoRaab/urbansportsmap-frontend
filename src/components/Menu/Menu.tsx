import React from 'react';
import MenuItem from './MenuItem';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import {useNavigate} from 'react-router-dom';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import {ICONS} from '../../constants/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {uiActions} from '../../store/uiSlice';
import {authActions, selectUserLoggedIn} from '../../store/authSlice';
import {removeUserDataFromStorage} from '../../util/userdata-localstorage';

type MenuProps = {
    isShowing: boolean
}

const Menu = ({isShowing}: MenuProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectUserLoggedIn);

    console.log(isLoggedIn);

    let menuClass = '-translate-x-full';

    if (isShowing) {
        menuClass = 'translate-x-0';
    }

    const handleLoginClick = () => {
        navigate('/login');
        dispatch(uiActions.menuHidden());
    }

    const handleSignupClick = () => {
        navigate('/signup');
        dispatch(uiActions.menuHidden());
    }

    const handleLogoutClick = () => {
        dispatch(authActions.removeCredentials());
        removeUserDataFromStorage();
        dispatch(uiActions.menuHidden());
        navigate('/');
    }

    return (
        <aside className="relative">
            <div
                className={'fixed h-screen flex flex-col w-3/4 lg:w-1/4 bg-white z-1050 shadow border-slate-200 border-r-8 transition duration-500 ' + menuClass}>

                <div className="flex flex-col w-full">

                    <MenuItem destination={'/'}
                              text={'Home'}
                              icon={ICONS.MAP}/>

                    {isLoggedIn &&
                        <>
                            <MenuItem destination={'/favorites'}
                                      text={'Favoriten'}
                                      icon={ICONS.HEART_FILLED}/>

                            <MenuItem destination={'/profile'}
                                      text={'Profile'}
                                      icon={ICONS.USER}/>

                            <MenuItem destination={'/settings'}
                                      text={'Settings'}
                                      icon={ICONS.SETTINGS}/>
                        </>
                    }

                </div>


                <div className="flex justify-center my-8">
                    {!isLoggedIn &&
                        <>
                            <div className="m-2 w-1/2">
                                <SecondaryButton text={'Log in'} handleOnClick={handleLoginClick}/>
                            </div>

                            <div className="m-2 w-1/2">
                                <PrimaryButton text={'Sign up'} handleOnClick={handleSignupClick}/>
                            </div>
                        </>
                    }
                    {isLoggedIn &&
                        <>
                            <div className="m-2 w-1/2">
                                <SecondaryButton text={'Log out'} handleOnClick={handleLogoutClick}/>
                            </div>
                        </>
                    }
                </div>

            </div>
        </aside>
    )
}

export default Menu;