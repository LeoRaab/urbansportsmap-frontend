import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../index';
import VenueImage from '../../types/VenueImage';

export const imagesApi = createApi({
    reducerPath: 'imagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/images/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Images'],
    endpoints: builder => ({
        getImagesByVenue: builder.query<VenueImage[], string>({
            query: (venueId) => ({ url: `/venue/${venueId}` }),
            transformResponse: (responseData: any) => responseData.images,
            providesTags: ['Images']
        }),
        getImagesByUser: builder.query<VenueImage[], string>({
            query: (userId) => ({ url: `/${userId}` }),
            transformResponse: (responseData: any) => responseData.images,
            providesTags: ['Images']
        }),
        addImages: builder.mutation<{ message: string }, { venueId: string, uploadImages: FormData }>({
            query: ({ venueId, uploadImages }) => ({
                url: venueId,
                method: 'POST',
                body: uploadImages
            }),
            invalidatesTags: ['Images']
        }),
        /*
        updateComment: builder.mutation<{ message: string }, { commentId: string, comment: string }>({
            query: ({ commentId, comment }) => ({
                url: commentId,
                method: 'PATCH',
                body: { comment }
            }),
            invalidatesTags: ['Images']
        }),
        removeComment: builder.mutation<{ message: string }, string>({
            query: (commentId) => ({
                url: commentId,
                method: 'DELETE'
            }),
            invalidatesTags: ['Images']
        })
        */
    })
})

export const {
    useAddImagesMutation
} = imagesApi;