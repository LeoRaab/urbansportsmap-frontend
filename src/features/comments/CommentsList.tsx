import React from 'react';
import VenueComment from '../../common/types/VenueComment';
import CommentItem from './CommentItem';

type CommentsListProps = {
    comments?: VenueComment[]
}

const CommentsList = ({comments}: CommentsListProps) => {

    const venueCommentsListItems = comments?.map((comment, key) =>
        <CommentItem key={key}
                          comment={comment}/>
    );

    return (
        <>
            {venueCommentsListItems}
        </>
    )
}

export default CommentsList;