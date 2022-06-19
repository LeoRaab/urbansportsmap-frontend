import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "./store";

const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({})
});

export default apiSlice;