/**
 * TODO: Show detail settings only when logged in
 */

import React, {useState} from 'react';
import PageHeader from '../components/UI/PageHeader';
import SportTypesList from '../components/SportTypesList/SportTypesList';
import {useNavigate, useParams} from 'react-router-dom';
import DetailSettings from '../components/Details/DetailSettings';
import FabButton from '../components/UI/buttons/FabButton';
import Icon from '../components/UI/Icon';
import {ICONS} from '../constants/Icons';
import VenueTitle from '../components/UI/VenueTitle';
import CommentForm from '../components/Forms/CommentForm';
import Venue from '../types/Venue';
import {useGetVenueByIdQuery} from '../store/api/venuesApi';

const Detail = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    const {data: venue, isLoading, isFetching} = useGetVenueByIdQuery(params.venueId!);

    const handleEditImagesClick = () => {
        //venueImages.loadImages();
    }

    const handleAddCommentClick = () => {
        setShowCommentForm(true);
    }

    const handleEditCommentClick = (comment: string, commentId: number) => {
        //venueComments.edit(comment, commentId);
    }

    const handleDeleteCommentClick = (commentId: number) => {
        //venueComments.remove(commentId);
    }

    const handleFormSubmit = (comment: string) => {
        //venueComments.add(comment);
        setShowCommentForm(false);
    }

    const handleFormCancel = () => {
        setShowCommentForm(false);
    }

    return (
        <div className="h-screen relative">

            <PageHeader text={'Detail'}/>

            <div className="mt-6">
                <VenueTitle venue={venue}/>
            </div>

            <div className="px-2 mt-6 mb-2">
                <SportTypesList sportTypes={venue?.sportTypes}/>
            </div>

            {venue?.id &&
                <DetailSettings venue={venue}
                                onEditImagesClick={handleEditImagesClick}
                                onCommentClick={handleAddCommentClick}/>
            }

            {showCommentForm &&
                <CommentForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel}/>
            }

            {/*
                <div className="h-1/3 my-4">
                    <ImageSwiper images={venueImages.images}/>
                </div>
            */}


            <div className="fixed bottom-6 right-2 z-800">
                <FabButton backgroundColor="bg-green-200"
                           onFabButtonClick={() => navigate('/' + venue?.location.lat + ',' + venue?.location.lng)}>
                    <Icon icon={ICONS.MAP}/>
                </FabButton>
            </div>

            {/*venueComments.comments.length > 0 &&
                <div className="px-2 mt-4 mb-4">
                    <h2 className="text-2xl mb-4">Kommentare</h2>
                    <VenueCommentsList comments={venueComments.comments}
                                       onEditClick={handleEditCommentClick}
                                       onDeleteClick={handleDeleteCommentClick}/>
                </div>
            */}

        </div>
    )
}

export default Detail;