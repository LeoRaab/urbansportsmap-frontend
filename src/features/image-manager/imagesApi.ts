import apiSlice from '../../app/apiSlice';
import VenueImage from '../../common/types/VenueImage';

export const imagesApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Images'] }).injectEndpoints({
  endpoints: (builder) => ({
    getImagesByVenue: builder.query<VenueImage[], string>({
      query: (venueId) => ({ url: `images/venue/${venueId}` }),
      transformResponse: (responseData: { images: VenueImage[] }) => responseData.images,
      providesTags: ['Images'],
    }),
    getImagesByUser: builder.query<VenueImage[], void>({
      query: () => ({ url: `images/user` }),
      transformResponse: (responseData: { images: VenueImage[] }) => responseData.images,
      providesTags: ['Images'],
    }),
    getImagesByVenueAndUser: builder.query<VenueImage[], string>({
      query: (venueId) => ({ url: `images/venue/${venueId}/user` }),
      transformResponse: (responseData: { images: VenueImage[] }) => responseData.images,
      providesTags: ['Images'],
    }),
    uploadImages: builder.mutation<{ message: string }, { venueId: string; uploadImages: FormData }>({
      query: ({ venueId, uploadImages }) => ({
        url: 'images/' + venueId,
        method: 'POST',
        body: uploadImages,
      }),
      invalidatesTags: ['Images'],
    }),
    deleteImage: builder.mutation<{ message: string }, string>({
      query: (imageId) => ({
        url: 'images/' + imageId,
        method: 'DELETE',
      }),
      invalidatesTags: ['Images'],
    }),
  }),
});

export const {
  useGetImagesByVenueQuery,
  useGetImagesByUserQuery,
  useGetImagesByVenueAndUserQuery,
  useUploadImagesMutation,
  useDeleteImageMutation,
} = imagesApi;
