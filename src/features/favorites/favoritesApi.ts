import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../app/store';
import Venue from '../../common/types/Venue';

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/favorites/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Favorites'],
    endpoints: builder => ({
        getFavorites: builder.query<Venue[], void>({
            query: () => '',
            transformResponse: (responseData: any) => responseData.favorites,
            providesTags: ['Favorites']
        }),
        addFavorite: builder.mutation<{message: string}, string>({
            query: (venueId) => ({
                url: venueId,
                method: 'POST'
            }),
            invalidatesTags: ['Favorites']
        }),
        removeFavorite: builder.mutation<{message: string}, string>({
            query: (venueId) => ({
                url: venueId,
                method: 'DELETE'
            }),
            invalidatesTags: ['Favorites']
        })
    })
})

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation
} = favoritesApi;