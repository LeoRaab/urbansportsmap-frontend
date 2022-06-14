import React from 'react';
import VenueComment from '../../types/VenueComment';
import VenueCommentItem from './VenueCommentItem';

type VenueCommentsListProps = {
    comments?: VenueComment[]
}

const VenueCommentsList = ({comments}: VenueCommentsListProps) => {

    const venueCommentsListItems = comments?.map((comment, key) =>
        <VenueCommentItem key={key}
                          comment={comment}/>
    );

    return (
        <>
            {venueCommentsListItems}
        </>
    )
}

export default VenueCommentsList;