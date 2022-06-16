import {configureStore} from '@reduxjs/toolkit';
import dialogSlice from '../common/components/UI/dialog/dialogSlice';
import toastSlice from '../common/components/UI/toast/toastSlice';
import { commentsApi } from '../features/comments/commentsApi';
import { favoritesApi } from '../features/favorites/favoritesApi';
import filterSlice from '../features/filter/filterSlice';
import imageManagerSlice from '../features/image-manager/imageManagerSlice';
import { imagesApi } from '../features/image-manager/imagesApi';
import { geocodeApi } from '../features/map/geocodeApi';
import mapSlice from '../features/map/mapSlice';
import uiSlice from '../common/components/UI/uiSlice';
import { venuesApi } from '../features/map/venuesApi';
import { authApi } from '../features/user/authApi';
import authSlice from '../features/user/authSlice';

const store = configureStore({
    reducer: {
        filter: filterSlice,
        map: mapSlice,
        ui: uiSlice,
        auth: authSlice,
        imageManager: imageManagerSlice,
        dialog: dialogSlice,
        toast: toastSlice,
        [venuesApi.reducerPath]: venuesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            venuesApi.middleware, 
            geocodeApi.middleware, 
            favoritesApi.middleware,
            commentsApi.middleware,
            authApi.middleware,
            imagesApi.middleware
        )
});

export type RootState = ReturnType<typeof store.getState>

export default store;