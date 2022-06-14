import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
    userId: string | null,
    token: string | null,
    expirationDate: string | null
}

const initialState: AuthState = {
    userId: null,
    token: null,
    expirationDate: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { userId, token, expirationDate } }: PayloadAction<AuthState>) => {
            state.userId = userId;
            state.token = token;
            state.expirationDate = expirationDate
        },
        removeCredentials: (state) => {
            state.userId = null;
            state.token = null;
            state.expirationDate = null;
        }
    },
})

export const authActions = slice.actions

export default slice.reducer

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectExpirationDate = (state: RootState) => state.auth.expirationDate;
