import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface MapState {
  mapSettings: {
    initZoom: number;
    radiusColor: string;
    radiusMin: number;
    radiusMax: number;
  };
  mapCenter: {
    lat: number;
    lng: number;
  };
  venueRadius: number;
}

const initialState: MapState = {
  mapSettings: {
    initZoom: 15,
    radiusColor: '#94A3B8',
    radiusMin: 1000,
    radiusMax: 5000,
  },
  mapCenter: {
    lat: 48.20849,
    lng: 16.37208,
  },
  venueRadius: 1000,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    changeMapCenter: (state, { payload: { lat, lng } }: PayloadAction<{ lat: number; lng: number }>) => {
      state.mapCenter = { lat, lng };
    },
    changeVenueRadius: (state, { payload: { venueRadius } }: PayloadAction<{ venueRadius: number }>) => {
      state.venueRadius = venueRadius;
    },
  },
});

export const { changeMapCenter, changeVenueRadius } = mapSlice.actions;

export const selectMap = (state: RootState): MapState => state.map;

export default mapSlice.reducer;
