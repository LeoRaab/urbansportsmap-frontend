import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/form-elements/buttons/IconButton';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import Venue from '../../common/types/Venue';
import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from '../favorites/favoritesApi';
import ImageManager from '../image-manager/ImageManager';
import { selectImageManager, imageManagerActions } from '../image-manager/imageManagerSlice';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon, PhotographIcon, AnnotationIcon } from '@heroicons/react/outline';
import getErrorMessage from '../../common/util/get-error-message';
import useToast from '../../common/hooks/use-toast';
import { STRINGS } from '../../common/constants/strings';

type DetailSettingsProps = {
    venue: Venue,
    onCommentClick: () => void
}

const DetailSettings = ({ venue, onCommentClick }: DetailSettingsProps) => {
    const dispatch = useDispatch();
    const { data: favorites, isLoading, isFetching } = useGetFavoritesQuery();
    const [addFavorite, { data: addResponse, error: addError }] = useAddFavoriteMutation();
    const [deleteFavorite, { data: deleteResponse, error: deleteError }] = useRemoveFavoriteMutation();
    const imageManager = useSelector(selectImageManager);
    const toast = useToast();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (favorites) {
            setIsFavorite(!!favorites.find(favorite => favorite.id === venue.id));
        }
    }, [favorites, venue]);

    useEffect(() => {
        if (addResponse) {
            toast.show(addResponse.message)('success');
        }

        if (addError) {
            toast.show(getErrorMessage(addError))('error');
        }
    }, [addResponse, addError, toast]);

    useEffect(() => {
        if (deleteResponse) {
            toast.show(deleteResponse.message)('success');
        }

        if (deleteError) {
            toast.show(getErrorMessage(deleteError))('error');
        }
    }, [deleteResponse, deleteError, toast])

    const handleFavoriteClick = () => {
        if (!isFavorite) {
            addFavorite(venue.id);
        } else {
            deleteFavorite(venue.id);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-2 mt-4">
                {isFavorite &&
                    <IconButton text={STRINGS.FAVORITES_REMOVE} icon={<HeartIconSolid className="icon-size" />} onClick={handleFavoriteClick} />
                }

                {!isFavorite &&
                    <IconButton text={STRINGS.FAVORITES_ADD} icon={<HeartIcon className="icon-size" />} onClick={handleFavoriteClick} />
                }

                <IconButton text={STRINGS.IMAGES_EDIT} icon={<PhotographIcon className="icon-size" />} onClick={() => dispatch(imageManagerActions.start())} />
                <IconButton text={STRINGS.COMMENTS_ADD} icon={<AnnotationIcon className="icon-size" />} onClick={onCommentClick} />
            </div>

            {imageManager.isVisible &&
                <ImageManager venueId={venue.id} />
            }

            {(isLoading && isFetching) &&
                <LoadingSpinner />
            }
        </>
    )
}

export default DetailSettings;