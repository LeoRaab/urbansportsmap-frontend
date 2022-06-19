import {createSelector, createSlice} from '@reduxjs/toolkit';
import apiSlice from '../../app/apiSlice';
import { RootState } from '../../app/store';
import Venue from '../../common/types/Venue';

interface MapState {
    mapSettings: {
        initZoom: number,
        radiusColor: string,
        radiusMin: number,
        radiusMax: number
    },
    mapCenter: {
        lat: number,
        lng: number
    },
    venueRadius: number
}

const initialState: MapState = {
    mapSettings: {
        initZoom: 15,
        radiusColor: '#94A3B8',
        radiusMin: 1000,
        radiusMax: 5000
    },
    mapCenter: {
        lat: 48.20849,
        lng: 16.37208
    },
    venueRadius: 1000
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        mapCenterChanged: (state, action) => {
            state.mapCenter = {
                lat: action.payload.lat,
                lng: action.payload.lng
            }
        },
        venueRadiusChanged: (state, action) => {
            state.venueRadius = action.payload;
        }
    }
})

export const venuesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVenues: builder.query<Venue[], void>({
            query: () => 'venues',
            transformResponse: (responseData: any): Venue[] => {
                return responseData.venues;
            }
        }),
        getVenueById: builder.query<Venue, string>( {
            query: (venueId: string) => 'venues/' + venueId,
            transformResponse: (responseData: any) => {
                return responseData.venue;
            }
        })
    })
})

export const selectVenues = venuesApi.endpoints.getVenues.select();

/* export const selectVenueInRadius = (state: RootState) => createSelector(
    selectVenues,
    venueResult => venueResult.data?.filter(venue => {
        const distanceVenueToCenter = L.CRS.Earth.distance(venue.location, state.map.mapCenter);
        return distanceVenueToCenter <= state.map.venueRadius;
    })
); */

export const {
    useGetVenuesQuery,
    useGetVenueByIdQuery,
    useLazyGetVenueByIdQuery
} = venuesApi;

export const {mapCenterChanged, venueRadiusChanged} = mapSlice.actions;

export const selectMap = (state: RootState): MapState  => state.map;

export default mapSlice.reducer;