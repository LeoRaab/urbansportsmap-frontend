/**
 * TODO: How to get fullscreen on browsers, its working when going to favorites and then back to map
 * TODO: Implement Report Image/Comment Feature
 * TODO: Check if username is already in use
 * TODO: Logging system
 * TODO: message constant
 * TODO: Message system --> use endpoints at rtk query for message handling
 * TODO: Timeout bei Ladevorgängen
 * TODO: Put urls in .env
 * TODO: Put LoadingSpinner in hook & reducer && check usage
 * TODO: When changing password confirmation password has to be invalid again!
 * TODO: Format with prettier
 * TODO: Refactor css
 * TODO: When editing comment textarea is empty
 * TODO: Constant reducer naming
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from '../common/components/PageNotFound';
import useAuth from '../common/hooks/use-auth';
import Detail from '../features/detail/Detail';
import Favorites from '../features/favorites/Favorites';
import MapUI from '../features/map/MapUI';
import Login from '../features/user/Login';
import Profile from '../features/user/Profile';
import Signup from '../features/user/Signup';
import VerifyUser from '../features/user/VerifyUser';
import MainLayout from './MainLayout';
import PageLayout from './PageLayout';
import { useGetVenuesQuery } from '../features/map/venuesSlice';
import RequireAuth from '../features/user/RequireAuth';
import LoadingSpinner from '../common/components/UI/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { toastsActions } from '../common/components/UI/toast/toastsSlice';
import { useEffect } from 'react';
import ToastsList from '../common/components/UI/toast/ToastsList';
import Dialog from '../common/components/UI/dialog/Dialog';
import AppRoutes from './AppRoutes';

const App = () => {
    
    const {isLoading, isFetching, isError} = useGetVenuesQuery();
    const dispatch = useDispatch();
    useAuth();

    useEffect(() => {
        if (isError) {
            dispatch(toastsActions.addToast({message: "Venues konnten nicht geladen werden...", type: "error"}));
        }
    }, [isError])

    return (
        <>
            <AppRoutes />

            <ToastsList />

            <Dialog />

            {(isLoading || isFetching) &&
                    <LoadingSpinner />
                }
        </>
    );
}

export default App;