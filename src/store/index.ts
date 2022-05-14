import {configureStore} from '@reduxjs/toolkit';
import uiSlice from './uiSlice';
import filterSlice from './filterSlice';
import mapSlice from './mapSlice';
import {venuesApi} from './api/venuesApi';
import {geocodeApi} from './api/geocodeApi';
import {favoritesApi} from './api/favoritesApi';
import {authApi} from './api/authApi';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        filter: filterSlice,
        map: mapSlice,
        ui: uiSlice,
        auth: authSlice,
        [venuesApi.reducerPath]: venuesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            venuesApi.middleware, geocodeApi.middleware, favoritesApi.middleware, authApi.middleware
        )
})


export type RootState = ReturnType<typeof store.getState>

export default store;