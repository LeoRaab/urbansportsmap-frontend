/**
 * TODO: teaserVenueObjectId hat hier nix zu suchen
 * TODO: rename from showing to visible
 */

import {createSlice} from '@reduxjs/toolkit'

interface UiState {
    teaserVenueId: string,
    isMenuShowing: boolean,
    isFilterShowing: boolean,
    isSearchResultsShowing: boolean,
    isTeaserShowing: boolean,
    isImagePickerVisible: boolean
}

const initialState: UiState = {
    teaserVenueId: '',
    isMenuShowing: false,
    isFilterShowing: false,
    isSearchResultsShowing: false,
    isTeaserShowing: false,
    isImagePickerVisible: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        menuShown: state => {
            state.isMenuShowing = true;
        },
        menuToggle: state => {
            state.isMenuShowing = !state.isMenuShowing;
        },
        menuHidden: state => {
            state.isMenuShowing = false;
        },
        filterShown: state => {
            state.isFilterShowing = true;
        },
        filterHidden: state => {
            state.isFilterShowing = false;
        },
        searchResultsShown: state => {
            state.isSearchResultsShowing = true;
        },
        searchResultsHidden: state => {
            state.isSearchResultsShowing = false;
        },
        teaserShown: (state, action) => {
            state.isTeaserShowing = true;
            state.teaserVenueId = action.payload;
        },
        teaserHidden: state => {
            state.isTeaserShowing = false;
        },
        showImagePicker: state => {
            state.isImagePickerVisible = true;
        },
        hideImagePicker: state => {
            state.isImagePickerVisible = false;
        },
        allHidden: state => {
            state.isFilterShowing = false;
            state.isSearchResultsShowing = false;
            state.isTeaserShowing = false;
            state.isMenuShowing = false;
        }
    }
})

export const uiActions = uiSlice.actions;

export const selectUi = (state: any): UiState  => state.ui;

export default uiSlice.reducer;