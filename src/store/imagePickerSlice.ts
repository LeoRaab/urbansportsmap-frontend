import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ImagePickerState {
    selectedImages: Blob[],
}

const initialState: ImagePickerState = {
    selectedImages: []
}

export const imagePickerSlice = createSlice({
    name: 'imagePicker',
    initialState,
    reducers: {
        selectImages: (state, { payload: { selectedImages } }: PayloadAction<ImagePickerState>) => {
            state.selectedImages.push(...selectedImages);
        }
    }
})

export const imagePickerActions = imagePickerSlice.actions;

export const selectFilters = (state: any): ImagePickerState => state.imagePicker;

export default imagePickerSlice.reducer;