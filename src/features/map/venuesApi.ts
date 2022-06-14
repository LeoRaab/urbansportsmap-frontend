import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import Venue from '../../common/types/Venue';

export const venuesApi = createApi({
    reducerPath: 'venuesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/venues/'}),
    endpoints: builder => ({
        getVenues: builder.query<Venue[], void>({
            query: () => '',
            transformResponse: (responseData: any) => {
                return responseData.venues;
            }
        }),
        getVenueById: builder.query<Venue, string>( {
            query: (venueId: string) => venueId,
            transformResponse: (responseData: any) => {
                return responseData.venue;
            }
        })
    })
})

export const {
    useGetVenuesQuery,
    useGetVenueByIdQuery,
    useLazyGetVenueByIdQuery
} = venuesApi;