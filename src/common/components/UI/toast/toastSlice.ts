import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import COLOR_SCHEME from '../../../types/ColorScheme';

interface ToastState {
    isVisible: boolean,
    message: string,
    colorScheme: COLOR_SCHEME,
    currentWidth: number
}

const initialState: ToastState = {
    isVisible: false,
    message: '',
    colorScheme: COLOR_SCHEME.SUCCESS,
    currentWidth: 0
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        show: (state, { payload: { message } }: PayloadAction<{ message: string, colorScheme: COLOR_SCHEME }>) => {
            state.isVisible = true;
            state.message = message;
            state.currentWidth = 100;
        },
        hide: state => {
            state.isVisible = false;
            state.message = '';
            state.currentWidth = 0;
        },
        updateCurrentWidth: (state, { payload: { currentWidth } }: PayloadAction<{ currentWidth: number }>) => {
            state.currentWidth = currentWidth;
        }
    }
})

export const toastActions = toastSlice.actions;

export const selectToast = (state: any): ToastState => state.toast;

export default toastSlice.reducer;