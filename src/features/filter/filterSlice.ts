import {createSlice} from '@reduxjs/toolkit';
import { SPORT_TYPE, ALLOWED_SPORT_TYPES } from '../../common/types/SportType';

interface FilterState {
    filters: SPORT_TYPE[],
    selectedFilters: SPORT_TYPE[],
    unselectedFilters: SPORT_TYPE[],
}

const initialState: FilterState = {
    filters: ALLOWED_SPORT_TYPES,
    selectedFilters: [],
    unselectedFilters: ALLOWED_SPORT_TYPES
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterSelected: (state, action) => {
            const index = action.payload;
            const filter = state.unselectedFilters[index];
            state.selectedFilters.push(filter);
            state.unselectedFilters.splice(index, 1);
        },
        filterUnselected: (state, action) => {
            const index = action.payload;
            const filter = state.selectedFilters[index];
            state.unselectedFilters.push(filter);
            state.selectedFilters.splice(index, 1);
        },
        filtersCleared: state => {
            state.selectedFilters = [];
            state.unselectedFilters = state.filters;
        }
    }
})

export const {filterSelected, filterUnselected, filtersCleared} = filterSlice.actions;

export const selectFilters = (state: any): FilterState => state.filter;

export default filterSlice.reducer;