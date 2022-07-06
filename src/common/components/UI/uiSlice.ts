/**
 * TODO: teaserVenueObjectId hat hier nix zu suchen
 * TODO: rename from showing to visible
 */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

interface UiState {
  teaserVenueId: string;
  isMenuShowing: boolean;
  isFilterShowing: boolean;
  isSearchResultsShowing: boolean;
  isTeaserShowing: boolean;
}

const initialState: UiState = {
  teaserVenueId: '',
  isMenuShowing: false,
  isFilterShowing: false,
  isSearchResultsShowing: false,
  isTeaserShowing: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showMenu: (state) => {
      state.isMenuShowing = true;
    },
    toggleMenu: (state) => {
      state.isMenuShowing = !state.isMenuShowing;
    },
    hideMenu: (state) => {
      state.isMenuShowing = false;
    },
    showFilter: (state) => {
      state.isFilterShowing = true;
    },
    hideFilter: (state) => {
      state.isFilterShowing = false;
    },
    showSearchResults: (state) => {
      state.isSearchResultsShowing = true;
    },
    hideSearchResults: (state) => {
      state.isSearchResultsShowing = false;
    },
    showTeaser: (state, action) => {
      state.isTeaserShowing = true;
      state.teaserVenueId = action.payload;
    },
    hideTeaser: (state) => {
      state.isTeaserShowing = false;
    },
    hideAll: (state) => {
      state.isFilterShowing = false;
      state.isSearchResultsShowing = false;
      state.isTeaserShowing = false;
      state.isMenuShowing = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export const selectUi = (state: RootState): UiState => state.ui;

export default uiSlice.reducer;
