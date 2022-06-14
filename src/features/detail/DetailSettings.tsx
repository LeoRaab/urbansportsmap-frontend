import React, { useEffect, useState } from 'react';
import { ICONS } from '../../constants/Icons';
import IconButton from '../UI/buttons/IconButton';

import {
    useAddFavoriteMutation, useGetFavoritesQuery,
    useRemoveFavoriteMutation
} from '../../store/api/favoritesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import Venue from '../../types/Venue';
import COLOR_SCHEME from '../../types/ColorScheme';
import { useDispatch, useSelector } from 'react-redux';
import ImageManager from '../../features/ImageManger/ImageManager';
import { imageManagerActions, selectImageManager } from '../../store/imageManagerSlice';
import useToast from '../../hooks/use-toast';

type DetailSettingsProps = {
    venue: Venue,
    onEditImagesClick: () => void,
    onCommentClick: () => void
}

const DetailSettings = ({ venue, onCommentClick, onEditImagesClick }: DetailSettingsProps) => {
    const dispatch = useDispatch();
    const { data: favorites, isLoading, isFetching } = useGetFavoritesQuery();
    const [addFavorite, { data: addResponse }] = useAddFavoriteMutation();
    const [removeFavorite, { data: removeResponse }] = useRemoveFavoriteMutation();
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
            toast.show(addResponse.message, COLOR_SCHEME.SUCCESS);
        }
    }, [addResponse]);

    useEffect(() => {
        if (removeResponse) {
            toast.show(removeResponse.message, COLOR_SCHEME.SUCCESS);
        }
    }, [removeResponse])

    const handleFavoriteClick = () => {
        if (!isFavorite) {
            addFavorite(venue.id);
        } else {
            removeFavorite(venue.id);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 mt-8">
                {isFavorite &&
                    <IconButton text={'von Favoriten entfernen'} icon={ICONS.HEART_FILLED}
                        handleOnClick={handleFavoriteClick} />
                }

                {!isFavorite &&
                    <IconButton text={'zu Favoriten hinzufügen'} icon={ICONS.HEART}
                        handleOnClick={handleFavoriteClick} />
                }

                <IconButton text={'Bilder bearbeiten'} icon={ICONS.GALLERY} handleOnClick={() => dispatch(imageManagerActions.show())} />
                <IconButton text={'Kommentar schreiben'} icon={ICONS.COMMENT} handleOnClick={onCommentClick} />
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