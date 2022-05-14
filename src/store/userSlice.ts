import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProfile} from '../types/UserProfile';

interface UserState {
    isLoggedIn: boolean,
    userProfile: UserProfile
}

const initialState: UserState = {
    isLoggedIn: false,
    userProfile: {
        uid: '',
        email: '',
        name: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, action: PayloadAction<UserProfile>) => {
            state.isLoggedIn = true;
            state.userProfile = action.payload;
        },
        loggedOut: state => {
            state = initialState;
        }
    }
});

export const userActions = userSlice.actions;

export const selectUser = (state: UserState) => state;

export default userSlice.reducer;