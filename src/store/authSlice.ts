import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './index';
import {getUserDataFromStorage} from '../util/userdata-localstorage';

export interface AuthState {
    userId: string | null,
    token: string | null
}

const initialState = getUserDataFromStorage();

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state,
                         {payload: {userId, token}}: PayloadAction<{ userId: string, token: string }>) => {
            state.userId = userId;
            state.token = token;
        },
        removeCredentials: (state) => {
            state.userId = null;
            state.token = null;
        }
    },
})

export const authActions = slice.actions

export default slice.reducer

export const selectUserId = (state: RootState) => state.auth.userId;
