import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '../../common/components/UI/buttons/IconButton';
import Card from '../../common/components/UI/Card';
import useToast from '../../common/hooks/use-toast';
import COLOR_SCHEME from '../../common/types/ColorScheme';
import VenueComment from '../../common/types/VenueComment';
import { selectUserId } from '../user/authSlice';
import CommentForm from './CommentForm';
import { useUpdateCommentMutation, useRemoveCommentMutation } from './commentsApi';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

type CommentItemProps = {
    comment: VenueComment
}

const CommentItem = ({ comment }: CommentItemProps) => {
    const userId = useSelector(selectUserId);
    const [updateComment, { data: updateResponse }] = useUpdateCommentMutation();
    const [removeComment, { data: removeResponse }] = useRemoveCommentMutation();
    const toast = useToast();
    const commentDate = new Date(comment.updatedAt).toLocaleDateString('de-DE');
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    useEffect(() => {
        if (updateResponse) {
            toast.show(updateResponse.message, COLOR_SCHEME.SUCCESS);
        }
    }, [updateResponse]);

    useEffect(() => {
        if (removeResponse) {
            toast.show(removeResponse.message, COLOR_SCHEME.SUCCESS);
        }
    }, [removeResponse]);

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
                            <IconButton text={'löschen'} icon={<TrashIcon />} onClick={handleDeleteCommentClick} />
                            <IconButton text={'editieren'} icon={<PencilAltIcon />} onClick={handleEditClick} />
                        </div>
                    }
                </Card>
                {showCommentForm &&
                    <CommentForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel} commentValue={comment.comment} />
                }
            </div>
        </>
    )
}

export default CommentItem;