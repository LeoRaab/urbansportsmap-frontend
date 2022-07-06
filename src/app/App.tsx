import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../common/hooks/use-auth';
import { useGetVenuesQuery } from '../features/map/venuesSlice';
import LoadingSpinner from '../common/components/UI/LoadingSpinner';
import ToastsList from '../common/components/UI/toast/ToastsList';
import Dialog from '../common/components/UI/dialog/Dialog';
import AppRoutes from './AppRoutes';
import { STRINGS } from '../common/constants/strings';
import { addToast } from '../common/components/UI/toast/toastsSlice';

const App = () => {
    
    const dispatch = useDispatch();
    const {isLoading, isFetching, isError} = useGetVenuesQuery();
    useAuth();

    useEffect(() => {
        if (isError) {
            dispatch(addToast({message: STRINGS.ERROR_LOAD_VENUES, type: 'error'}));
        }
    }, [isError, dispatch])

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