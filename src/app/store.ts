import {configureStore} from '@reduxjs/toolkit';
import dialogSlice from '../common/components/UI/dialog/dialogSlice';
import toastSlice from '../common/components/UI/toast/toastSlice';
import { favoritesApi } from '../features/favorites/favoritesApi';
import filterSlice from '../features/filter/filterSlice';
import imageManagerSlice from '../features/image-manager/imageManagerSlice';
import { geocodeApi } from '../features/map/geocodeApi';
import mapSlice from '../features/map/mapSlice';
import uiSlice from '../common/components/UI/uiSlice';
import apiSlice from './apiSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        filter: filterSlice,
        map: mapSlice,
        ui: uiSlice,
        user: userSlice,
        imageManager: imageManagerSlice,
        dialog: dialogSlice,
        toast: toastSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiSlice.middleware, 
            geocodeApi.middleware, 
            favoritesApi.middleware
        )
});

export type RootState = ReturnType<typeof store.getState>

export default store;