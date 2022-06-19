import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiSlice from '../../app/apiSlice';
import { User, SignupUser } from '../../common/types/User';

export interface UserResponse {
    userId: string,
    token: string,
    message?: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface UserState {
    userId: string | null,
    token: string | null,
    expirationDate: string | null
}

const initialState: UserState = {
    userId: null,
    token: null,
    expirationDate: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { userId, token, expirationDate } }: PayloadAction<UserState>) => {
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

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'users/login',
                method: 'POST',
                body: credentials,
            })
        }),
        getUser: builder.query<User, string>({
            query: (userId) => 'users/' + userId,
            transformResponse: (responseData: any) => responseData.user
        }),
        signup: builder.mutation<{ message: string }, SignupUser>({
            query: (signupUser) => ({
                url: 'users/signup',
                method: 'POST',
                body: signupUser
            })
        }),
        verify: builder.query<{ message: string }, string>({
            query: (verifyString) => 'users/verify/' + verifyString
        }),
    }),
    overrideExisting: false
})

export const userActions = slice.actions

export default slice.reducer

export const selectUserId = (state: RootState) => state.user.userId;
export const selectExpirationDate = (state: RootState) => state.user.expirationDate;

export const { useLoginMutation, useLazyGetUserQuery, useSignupMutation, useLazyVerifyQuery } = userApi;