import apiSlice from '../../app/apiSlice';
import VenueImage from '../../common/types/VenueImage';

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

export const imagesApi = apiSlice.enhanceEndpoints({addTagTypes: ['Images']}).injectEndpoints({
    endpoints: builder => ({
        getImagesByVenue: builder.query<VenueImage[], string>({
            query: (venueId) => ({ url: `images/venue/${venueId}` }),
            transformResponse: (responseData: {images: DBVenueImage[]}) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        getImagesByUser: builder.query<VenueImage[], void>({
            query: () => ({ url: `images/user` }),
            transformResponse: (responseData: {images: DBVenueImage[]}) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        getImagesByVenueAndUser: builder.query<VenueImage[], string>({
            query: (venueId) => ({ url: `images/venue/${venueId}/user` }),
            transformResponse: (responseData: { images: DBVenueImage[] }) => venueImagesFactory(responseData.images),
            providesTags: ['Images']
        }),
        uploadImages: builder.mutation<{ message: string }, { venueId: string, uploadImages: FormData }>({
            query: ({ venueId, uploadImages }) => ({
                url: '/images' + venueId,
                method: 'POST',
                body: uploadImages
            }),
            invalidatesTags: ['Images']
        }),
        deleteImage: builder.mutation<{ message: string }, string>({
            query: (imageId) => ({
                url: 'images/' + imageId,
                method: 'DELETE'
            }),
            invalidatesTags: ['Images']
        })
    })
})

export const {
    useGetImagesByVenueQuery,
    useGetImagesByUserQuery,
    useGetImagesByVenueAndUserQuery,
    useUploadImagesMutation,
    useDeleteImageMutation
} = imagesApi;