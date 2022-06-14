import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignupUser, User } from '../../types/User';
import { RootState } from '../index';

export interface UserResponse {
    userId: string,
    token: string,
    message?: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/users/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            })
        }),
        getUser: builder.query<User, string>({
            query: (userId) => userId,
            transformResponse: (responseData: any) => responseData.user
        }),
        signup: builder.mutation<{ message: string }, SignupUser>({
            query: (signupUser) => ({
                url: 'signup',
                method: 'POST',
                body: signupUser
            })
        }),
        verify: builder.query<{ message: string }, string>({
            query: (verifyString) => 'verify/' + verifyString
        }),
    }),
})

export const { useLoginMutation, useLazyGetUserQuery, useSignupMutation, useLazyVerifyQuery } = authApi;
