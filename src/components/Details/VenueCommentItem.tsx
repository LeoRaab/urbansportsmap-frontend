import React, {useState} from 'react';
import Card from '../UI/Card';
import VenueComment from '../../types/VenueComment';
import {ICONS} from '../../constants/Icons';
import IconButton from '../UI/buttons/IconButton';
import CommentForm from '../Forms/CommentForm';
import {userRepository} from '../../repositories/userRepository';

type VenueCommentItemProps = {
    comment: VenueComment,
    onEditClick: (comment: string, commentId: number) => void,
    onDeleteClick: (commentId: number) => void
}

const VenueCommentItem = ({comment, onEditClick, onDeleteClick}: VenueCommentItemProps) => {
    const userRepo = userRepository();
    const commentDate = new Date(comment.date).toLocaleDateString('de-DE');
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    const handleEditClick = () => {
        setShowCommentForm(true);
    }

    const handleFormSubmit = (commentText: string) => {
        setShowCommentForm(false);
        onEditClick(commentText, comment.id);
    }

    const handleFormCancel = () => {
        setShowCommentForm(false);
    }

    return (
        <div className="my-2">
            <Card>
                <p className="text-sm font-bold mb-4">{comment.author}, {commentDate}</p>
                <p className="whitespace-pre-line">{comment.comment}</p>
                {userRepo.user && userRepo.user.id === comment.uid &&
                    <div className="flex justify-between border-t border-t-slate-200 mt-4">
                        <IconButton text={'löschen'} icon={ICONS.TRASH} handleOnClick={() => onDeleteClick(comment.id)}/>
                        <IconButton text={'editieren'} icon={ICONS.EDIT} handleOnClick={handleEditClick}/>
                    </div>
                }
            </Card>
            {showCommentForm &&
                <CommentForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel} commentValue={comment.comment}/>
            }
        </div>
    )
}

export default VenueCommentItem;