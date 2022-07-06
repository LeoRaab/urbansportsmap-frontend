import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/form-elements/buttons/IconButton';
import Card from '../../common/components/UI/Card';
import VenueComment from '../../common/types/VenueComment';
import { selectUserId } from '../user/userSlice';
import CommentForm from './CommentForm';
import { useUpdateCommentMutation, useRemoveCommentMutation } from './commentsApi';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import useDialog from '../../common/hooks/use-dialog';
import { STRINGS } from '../../common/constants/strings';
import { addToast } from '../../common/components/UI/toast/toastsSlice';

type CommentItemProps = {
    comment: VenueComment
}

const CommentItem = ({ comment }: CommentItemProps) => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const [updateComment, { data: updateResponse }] = useUpdateCommentMutation();
    const [deleteComment, { data: deleteResponse }] = useRemoveCommentMutation();
    const commentDate = new Date(comment.updatedAt).toLocaleDateString('de-DE');
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
    const dialog = useDialog();

    useEffect(() => {
        if (updateResponse) {
            dispatch(addToast({message: updateResponse.message, type: 'success'}));
        }
    }, [updateResponse, dispatch]);

    useEffect(() => {
        if (deleteResponse) {
            dispatch(addToast({message: deleteResponse.message, type: 'success'}));
        }
    }, [deleteResponse, dispatch]);

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

    const handleDeleteCommentClick = async () => {
        const isAccepted = await dialog.open('Willst du das Kommentar wirklich löschen?');

        if (isAccepted) {
            deleteComment(comment.id);
        }
    }

    return (
        <>
            <div className="my-2">
                <Card>
                    <p className="text-sm font-bold mb-4">{comment.author.name}, {commentDate}</p>
                    <p className="whitespace-pre-line">{comment.comment}</p>
                    {(comment.author.id === userId) &&
                        <div className="flex justify-between border-t border-t-slate-200 pt-2 mt-4">
                            <IconButton text={STRINGS.COMMENTS_DELETE} icon={<TrashIcon className="icon-size"/>} onClick={handleDeleteCommentClick} />
                            <IconButton text={STRINGS.COMMENTS_EDIT} icon={<PencilAltIcon className="icon-size" />} onClick={handleEditClick} />
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