import React from 'react';
import VenueComment from '../../types/VenueComment';
import VenueCommentItem from './VenueCommentItem';

type VenueCommentsListProps = {
    comments?: VenueComment[];
    onEditClick: (comment: string, commentId: number) => void,
    onDeleteClick: (commentId: number) => void,
}

const VenueCommentsList = ({comments, onEditClick, onDeleteClick}: VenueCommentsListProps) => {

    const venueCommentsListItems = comments?.map((comment, key) =>
        <VenueCommentItem key={key}
                          comment={comment}
                          onEditClick={onEditClick}
                          onDeleteClick={onDeleteClick}/>
    );

    return (
        <>
            {venueCommentsListItems}
        </>
    )
}

export default VenueCommentsList;