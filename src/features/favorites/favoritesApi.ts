import apiSlice from '../../app/apiSlice';
import Venue from '../../common/types/Venue';

export const favoritesApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Favorites'] }).injectEndpoints({
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