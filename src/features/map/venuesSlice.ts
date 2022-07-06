import { createEntityAdapter, EntityState, createSelector } from '@reduxjs/toolkit';
import L from 'leaflet';
import apiSlice from '../../app/apiSlice';
import { RootState } from '../../app/store';
import Venue from '../../common/types/Venue';
import { hasVenueSportType } from '../../common/util/has-venue-sport-type';

const venuesAdapter = createEntityAdapter<Venue>();
const initialState = venuesAdapter.getInitialState();

export const venuesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVenues: builder.query<EntityState<Venue>, void>({
      query: () => 'venues',
      transformResponse: (responseData: any): EntityState<Venue> => {
        return venuesAdapter.setAll(initialState, responseData.venues);
      },
    }),
  }),
});

export const { useGetVenuesQuery } = venuesApi;

const selectVenues = venuesApi.endpoints.getVenues.select();
const selectVenuesData = createSelector(selectVenues, (venuesResult) => venuesResult.data);
export const { selectAll: selectAllVenues, selectById: selectVenueById } = venuesAdapter.getSelectors(
  (state: RootState) => selectVenuesData(state) ?? initialState,
);

const selectMapCenter = (state: RootState) => state.map.mapCenter;
const selectVenueRadius = (state: RootState) => state.map.venueRadius;
const selectSelectedFilters = (state: RootState) => state.filter.selectedFilters;
export const selectVisibleVenues = createSelector(
  selectAllVenues,
  selectMapCenter,
  selectVenueRadius,
  selectSelectedFilters,
  (venues, mapCenter, venueRadius, selectedFilters) =>
    venues
      .filter((venue) => {
        const distanceVenueToCenter = L.CRS.Earth.distance(venue.location, mapCenter);
        return distanceVenueToCenter <= venueRadius;
      })
      .filter((venue) => {
        if (selectedFilters.length > 0) {
          return hasVenueSportType(venue, selectedFilters);
        }
        return true;
      }),
);
