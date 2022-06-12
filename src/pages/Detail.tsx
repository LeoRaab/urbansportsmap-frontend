import React, { useEffect, useState } from 'react';
import SportTypesList from '../components/SportTypesList/SportTypesList';
import { useNavigate, useParams } from 'react-router-dom';
import DetailSettings from '../components/Details/DetailSettings';
import FabButton from '../components/UI/buttons/FabButton';
import Icon from '../components/UI/Icon';
import { ICONS } from '../constants/Icons';
import VenueTitle from '../components/UI/VenueTitle';
import CommentForm from '../components/Forms/CommentForm';
import { useLazyGetVenueByIdQuery } from '../store/api/venuesApi';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VenueCommentsList from '../components/Details/VenueCommentsList';
import { useAddCommentMutation, useLazyGetCommentsQuery } from '../store/api/commentsApi';
import { useSelector } from 'react-redux';
import { selectUserId } from '../store/authSlice';
import Toast from '../components/UI/Toast/Toast';
import COLOR_SCHEME from '../types/ColorScheme';
import PageWrapper from '../components/UI/PageWrapper';
import ImageSwiper from '../components/UI/ImageSwiper';
import Dialog from '../components/UI/Dialog/Dialog';

const Detail = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [loadVenue, { data: venue, isLoading, isFetching }] = useLazyGetVenueByIdQuery();
    const [loadVenueComments, { data: venueComments }] = useLazyGetCommentsQuery();
    const [addComment, { data: addCommentResponse }] = useAddCommentMutation();
    const userId = useSelector(selectUserId);

    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    useEffect(() => {
        if (params.venueId) {
            loadVenue(params.venueId);
        }
    }, [params.venueId, loadVenue])

    useEffect(() => {
        if (venue) {
            loadVenueComments(venue.id);
        }
    }, [venue, loadVenueComments, loadVenueComments]);

    const handleEditImagesClick = () => {
        //venueImages.loadImages();
    }

    const handleAddCommentClick = () => {
        setShowCommentForm(true);
    }

    const handleFormSubmit = (comment: string) => {
        addComment({ venueId: venue!.id, comment });
        setShowCommentForm(false);
    }

    const handleFormCancel = () => {
        setShowCommentForm(false);
    }

    const handleTest = () => {
        console.log('clicked');
    }

    return (
        <PageWrapper title={'Detail'}>
            <div className="mt-6">
                <VenueTitle venue={venue} />
            </div>

            <div className="mt-6 mb-2">
                <SportTypesList sportTypes={venue?.sportTypes} />
            </div>

            {(userId && venue?.id) &&
                <DetailSettings venue={venue}
                    onEditImagesClick={handleEditImagesClick}
                    onCommentClick={handleAddCommentClick} />
            }

            {showCommentForm &&
                <CommentForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel} />
            }

            {venue &&
                <div className="h-1/3 my-4">
                    <ImageSwiper venueId={venue.id} />
                </div>
            }

            <div className="fixed bottom-6 right-2 z-800">
                <FabButton backgroundColor="bg-green-200"
                    onFabButtonClick={() => navigate('/' + venue?.location.lat + ',' + venue?.location.lng)}>
                    <Icon icon={ICONS.MAP} />
                </FabButton>
            </div>

            {(venueComments && venueComments.length > 0) &&
                <div className="mt-8">
                    <h2 className="text-2xl mb-4">Kommentare</h2>
                    <VenueCommentsList comments={venueComments} />
                </div>
            }

            {(isLoading || isFetching) &&
                <LoadingSpinner />
            }

            {addCommentResponse &&
                <Toast colorScheme={COLOR_SCHEME.SUCCESS} text={addCommentResponse.message} />
            }

        </PageWrapper>
    )
}

export default Detail;