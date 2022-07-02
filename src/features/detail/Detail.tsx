import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import ImageSwiper from '../../common/components/UI/ImageSwiper';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import VenueTitle from '../../common/components/UI/VenueTitle';
import useToast from '../../common/hooks/use-toast';
import CommentForm from '../comments/CommentForm';
import { useLazyGetCommentsQuery, useAddCommentMutation } from '../comments/commentsApi';
import CommentsList from '../comments/CommentsList';
import { selectVenueById, useLazyGetVenueByIdQuery } from '../map/venuesSlice';
import { selectUserId } from '../user/userSlice';
import DetailSettings from './DetailSettings';
import {MapIcon} from '@heroicons/react/outline';
import { RootState } from '../../app/store';
import GraphicMessage from '../../common/components/UI/GraphicMessage';
import { ILLUSTRATIONS } from '../../common/constants/illustrations';

const Detail = () => {

    const navigate = useNavigate();
    const params = useParams();
    const venue = useSelector((state: RootState) => selectVenueById(state, params.venueId!))
    const [loadVenueComments, { data: venueComments }] = useLazyGetCommentsQuery();
    const [addComment, { data: addCommentResponse }] = useAddCommentMutation();
    const toast = useToast();
    const userId = useSelector(selectUserId);
    
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

    useEffect(() => {
        if (venue) {
            loadVenueComments(venue.id);
        }
    }, [venue, loadVenueComments]);

    useEffect(() => {
        if (addCommentResponse) {
            toast.show(addCommentResponse.message, 'success')
        }
    }, [addCommentResponse, toast]);

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

    return (
        <PageWrapper title={'Detail'}>
            {venue && 
                <>
                    <div className="mt-6">
                        <VenueTitle venue={venue} />
                    </div>

                    <div className="my-2">
                        <SportTypesList sportTypes={venue?.sportTypes} />
                    </div>

                    {(userId && venue?.id) &&
                        <DetailSettings venue={venue}
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

                    {(venueComments && venueComments.length > 0) &&
                        <div className="mt-8">
                            <h2 className="text-2xl mb-4">Kommentare</h2>
                            <CommentsList comments={venueComments} />
                        </div>
                    }

                    <div className="fixed bottom-6 right-2 z-800">
                        <FabButton backgroundColor="bg-green-200"
                            onClick={() => navigate('/' + venue?.location.lat + ',' + venue?.location.lng)}>
                            <MapIcon className="icon-size" />
                        </FabButton>
                    </div>
                </>
            }

            {!venue && 
                <GraphicMessage illustration={ILLUSTRATIONS.NOT_FOUND} text="Das angeforderte Venue existiert nicht." title="Nichts gefunden"/>
            }


        </PageWrapper>
    )
}

export default Detail;