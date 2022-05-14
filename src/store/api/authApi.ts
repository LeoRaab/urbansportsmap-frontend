import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from '../index';

export interface UserResponse {
    userId: string,
    token: string
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
        })
    }),
})

export const { useLoginMutation } = authApi;
