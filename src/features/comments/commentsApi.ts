import apiSlice from '../../app/apiSlice';
import VenueComment from '../../common/types/VenueComment';

export const commentsApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Comments'] }).injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<VenueComment[], string>({
      query: (venueId) => ({ url: `comments/venue/${venueId}` }),
      transformResponse: (responseData: any) => responseData.comments,
      providesTags: ['Comments'],
    }),
    addComment: builder.mutation<{ message: string }, { venueId: string; comment: string }>({
      query: ({ venueId, comment }) => ({
        url: 'comments/' + venueId,
        method: 'POST',
        body: { comment },
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation<{ message: string }, { commentId: string; comment: string }>({
      query: ({ commentId, comment }) => ({
        url: 'comments/' + commentId,
        method: 'PATCH',
        body: { comment },
      }),
      invalidatesTags: ['Comments'],
    }),
    removeComment: builder.mutation<{ message: string }, string>({
      query: (commentId) => ({
        url: 'comments/' + commentId,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useLazyGetCommentsQuery, useAddCommentMutation, useUpdateCommentMutation, useRemoveCommentMutation } =
  commentsApi;
