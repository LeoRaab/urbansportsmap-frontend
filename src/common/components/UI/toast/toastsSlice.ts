import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/store'

interface Toast {
    message: string,
    type: 'success' | 'error',
    duration: number
}

interface ToastsState {
    toasts: Toast[]
}

const initialState: ToastsState = {
    toasts: []
}

export const toastsSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, { payload: { message, type } }: PayloadAction<{ message: string, type: 'success' | 'error' }>) => {
            state.toasts.push({
                message,
                type,
                duration: 5000
            })
        },
        removeToast: (state, { payload: { toastId }}: PayloadAction<{toastId: number}>) => {
            state.toasts = state.toasts.filter((toast, index) => {
                return index !== toastId
            })
        }
    }
})

export const toastsActions = toastsSlice.actions;

export const selectToasts = (state: RootState): ToastsState => state.toasts;

export default toastsSlice.reducer;