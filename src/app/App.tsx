import React, { useEffect } from 'react';
import useAuth from '../common/hooks/use-auth';
import { useGetVenuesQuery } from '../features/map/venuesSlice';
import LoadingSpinner from '../common/components/UI/LoadingSpinner';
import ToastsList from '../common/components/UI/toast/ToastsList';
import Dialog from '../common/components/UI/dialog/Dialog';
import AppRoutes from './AppRoutes';
import useToast from '../common/hooks/use-toast';
import { STRINGS } from '../common/constants/strings';

const App = () => {
    
    const {isLoading, isFetching, isError} = useGetVenuesQuery();
    const toast = useToast();
    useAuth();

    useEffect(() => {
        if (isError) {
            toast.show(STRINGS.ERROR_LOAD_VENUES)('error');
        }
    }, [isError, toast])

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