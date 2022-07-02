import { createSlice } from '@reduxjs/toolkit'

interface ImageManagerState {
    isVisible: boolean,
    startScreen: boolean,
    selectImages: boolean,
    editImages: boolean
}

const initialState: ImageManagerState = {
    isVisible: false,
    startScreen: false,
    selectImages: false,
    editImages: false,
}

export const imageManagerSlice = createSlice({
    name: 'imageManager',
    initialState,
    reducers: {
        show: state => {
            state.isVisible = true;
            state.startScreen = true;
            state.selectImages = false;
            state.editImages = false;
        },
        hide: state => {
            state.isVisible = false;
            state.startScreen = false;
            state.selectImages = false;
            state.editImages = false;
        },
        selectImages: state => {
            state.startScreen = false;
            state.selectImages = true;
            state.editImages = false;
        },
        takePicture: state => {
            state.startScreen = false;
            state.selectImages = false;
            state.editImages = false;
        },
        editImages: state => {
            state.startScreen = false;
            state.selectImages = false;
            state.editImages = true;
        }
    }
})

export const imageManagerActions = imageManagerSlice.actions;

export const selectImageManager = (state: any): ImageManagerState => state.imageManager;

export default imageManagerSlice.reducer;