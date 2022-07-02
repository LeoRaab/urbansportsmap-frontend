import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/store'

interface ToastState {
    isVisible: boolean,
    message: string,
    type: 'success' | 'error',
    duration: number
}

const initialState: ToastState = {
    isVisible: true,
    message: 'asdassgdfgsdgff',
    type: 'success',
    duration: 5000
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        show: (state, { payload: { message, type } }: PayloadAction<{ message: string, type: 'success' | 'error' }>) => {
            state.isVisible = true;
            state.message = message;
            state.type = type;
        },
        hide: state => {
            state.isVisible = false;
            state.message = '';
        }
    }
})

export const toastActions = toastSlice.actions;

export const selectToast = (state: RootState): ToastState => state.toast;

export default toastSlice.reducer;