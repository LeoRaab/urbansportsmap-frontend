import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../app/store';
import VenueComment from '../../common/types/VenueComment';

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/comments/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Comments'],
    endpoints: builder => ({
        getComments: builder.query<VenueComment[], string>({
            query: (venueId) => ({ url: `venue/${venueId}` }),
            transformResponse: (responseData: any) => responseData.comments,
            providesTags: ['Comments']
        }),
        addComment: builder.mutation<{ message: string }, { venueId: string, comment: string }>({
            query: ({ venueId, comment }) => ({
                url: venueId,
                method: 'POST',
                body: { comment }
            }),
            invalidatesTags: ['Comments']
        }),
        updateComment: builder.mutation<{ message: string }, { commentId: string, comment: string }>({
            query: ({ commentId, comment }) => ({
                url: commentId,
                method: 'PATCH',
                body: { comment }
            }),
            invalidatesTags: ['Comments']
        }),
        removeComment: builder.mutation<{ message: string }, string>({
            query: (commentId) => ({
                url: commentId,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        })
    })
})

export const {
    useLazyGetCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useRemoveCommentMutation
} = commentsApi;