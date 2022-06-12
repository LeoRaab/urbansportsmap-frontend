import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DialogState {
    isVisible: boolean,
    message: string
}

const initialState: DialogState = {
    isVisible: false,
    message: ''
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        show: (state, { payload: { message } }: PayloadAction<{ message: string }>) => {
            state.isVisible = true;
            state.message = message;
        },
        hide: state => {
            state.isVisible = false;
            state.message = '';
        }
    }
})

export const dialogActions = dialogSlice.actions;

export const selectDialog = (state: any): DialogState => state.dialog;

export default dialogSlice.reducer;