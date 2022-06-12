import React, { useState } from 'react';
import Card from '../UI/Card';
import VenueComment from '../../types/VenueComment';
import { ICONS } from '../../constants/Icons';
import IconButton from '../UI/buttons/IconButton';
import CommentForm from '../Forms/CommentForm';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/authSlice';
import { useRemoveCommentMutation, useUpdateCommentMutation } from '../../store/api/commentsApi';
import Toast from '../UI/Toast/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';

type VenueCommentItemProps = {
    comment: VenueComment
}

const VenueCommentItem = ({ comment }: VenueCommentItemProps) => {
    const userId = useSelector(selectUserId);
    const [updateComment, { data: updateCommentResponse }] = useUpdateCommentMutation();
    const [removeComment, { data: removeCommentResponse }] = useRemoveCommentMutation();

    const commentDate = new Date(comment.updatedAt).toLocaleDateString('de-DE');
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    const handleEditClick = () => {
        setShowCommentForm(true);
    }

    const handleFormSubmit = (commentText: string) => {
        setShowCommentForm(false);
        updateComment({ commentId: comment.id, comment: commentText });
    }

    const handleFormCancel = () => {
        setShowCommentForm(false);
    }

    const handleDeleteCommentClick = () => {
        removeComment(comment.id);
    }

    return (
        <>
            <div className="my-2">
                <Card>
                    <p className="text-sm font-bold mb-4">{comment.author.name}, {commentDate}</p>
                    <p className="whitespace-pre-line">{comment.comment}</p>
                    {(comment.author.id === userId) &&
                        <div className="flex justify-between border-t border-t-slate-200 mt-4">
                            <IconButton text={'löschen'} icon={ICONS.TRASH} handleOnClick={handleDeleteCommentClick} />
                            <IconButton text={'editieren'} icon={ICONS.EDIT} handleOnClick={handleEditClick} />
                        </div>
                    }
                </Card>
                {showCommentForm &&
                    <CommentForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel} commentValue={comment.comment} />
                }
            </div>

            {updateCommentResponse && <Toast colorScheme={COLOR_SCHEME.SUCCESS} text={updateCommentResponse.message} />}

            {removeCommentResponse && <Toast colorScheme={COLOR_SCHEME.SUCCESS} text={removeCommentResponse.message} />}
        </>
    )
}

export default VenueCommentItem;