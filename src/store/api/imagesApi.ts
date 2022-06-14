import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import VenueImage from '../../types/VenueImage';
import { RootState } from '../index';

interface DBVenueImage {
    id: string,
    filename: string,
    altText: string,
    user: string,
    venue: string
}

const venueImagesFactory = (images: DBVenueImage[]): VenueImage[] => {
    return images.map(image => {
        return {
            id: image.id,
            url: 'http://localhost:5000/uploads/images/venues/' + image.venue + '/' + image.filename,
            altText: image.altText,
            venueId: image.venue,
            userId: image.user
        }
    })
}

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
            transformResponse: (responseData: {images: DBVenueImage[]}) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        getImagesByUser: builder.query<VenueImage[], void>({
            query: () => ({ url: `/user` }),
            transformResponse: (responseData: {images: DBVenueImage[]}) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        getImagesByVenueAndUser: builder.query<VenueImage[], string>({
            query: (venueId) => ({ url: `/venue/${venueId}/user` }),
            transformResponse: (responseData: { images: DBVenueImage[] }) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        uploadImages: builder.mutation<{ message: string }, { venueId: string, uploadImages: FormData }>({
            query: ({ venueId, uploadImages }) => ({
                url: venueId,
                method: 'POST',
                body: uploadImages
            }),
            invalidatesTags: ['Images']
        }),
        deleteImage: builder.mutation<{ message: string }, string>({
            query: (imageId) => ({
                url: imageId,
                method: 'DELETE'
            }),
            invalidatesTags: ['Images']
        })
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
    useGetImagesByVenueQuery,
    useGetImagesByUserQuery,
    useGetImagesByVenueAndUserQuery,
    useUploadImagesMutation,
    useDeleteImageMutation
} = imagesApi;