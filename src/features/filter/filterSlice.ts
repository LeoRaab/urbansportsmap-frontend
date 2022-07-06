import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SPORT_TYPE, ALLOWED_SPORT_TYPES } from '../../common/types/SportType';

interface FilterState {
  filters: SPORT_TYPE[];
  selectedFilters: SPORT_TYPE[];
  unselectedFilters: SPORT_TYPE[];
}

const initialState: FilterState = {
  filters: ALLOWED_SPORT_TYPES,
  selectedFilters: [],
  unselectedFilters: ALLOWED_SPORT_TYPES,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectFilter: (state, { payload: { index } }: PayloadAction<{ index: number }>) => {
      const filter = state.unselectedFilters[index];
      state.selectedFilters.push(filter);
      state.unselectedFilters.splice(index, 1);
    },
    unselectFilter: (state, { payload: { index } }: PayloadAction<{ index: number }>) => {
      const filter = state.selectedFilters[index];
      state.unselectedFilters.push(filter);
      state.selectedFilters.splice(index, 1);
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
      state.unselectedFilters = state.filters;
    },
  },
});

export const { selectFilter, unselectFilter, clearFilters } = filterSlice.actions;

export const selectFilters = (state: RootState): FilterState => state.filter;

export default filterSlice.reducer;
