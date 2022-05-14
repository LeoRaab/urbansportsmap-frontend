import {createSlice} from '@reduxjs/toolkit'

interface SearchState {
    searchTerm: string
    foundVenues: []
}

const initialState: SearchState = {
    searchTerm: '',
    foundVenues: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getVenue: state => {
            return state;
        }
    }
})

export const {}  = searchSlice.actions;

export const selectSearch = (state: any)  => state.mapSettings;

export default searchSlice.reducer;