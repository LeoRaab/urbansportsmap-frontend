import React, { useEffect, useState } from 'react';
import { ICONS } from '../../constants/Icons';
import IconButton from '../UI/buttons/IconButton';
import ImagePicker from '../ImagePicker/ImagePicker';
import {
    useAddFavoriteMutation, useGetFavoritesQuery,
    useRemoveFavoriteMutation
} from '../../store/api/favoritesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import Venue from '../../types/Venue';
import Toast from '../UI/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';

type DetailSettingsProps = {
    venue: Venue,
    onEditImagesClick: () => void,
    onCommentClick: () => void
}

const DetailSettings = ({ venue, onCommentClick, onEditImagesClick }: DetailSettingsProps) => {
    const [showImageModal, setShowImageModal] = useState<boolean>(false);
    const { data: favorites, isLoading, isFetching } = useGetFavoritesQuery();
    const [addFavorite, { data: addResponse }] = useAddFavoriteMutation();
    const [removeFavorite, { data: removeResponse }] = useRemoveFavoriteMutation();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (favorites) {
            setIsFavorite(!!favorites.find(favorite => favorite.id === venue.id));
        }
    }, [favorites, venue]);

    const handleFavoriteClick = () => {
        if (!isFavorite) {
            addFavorite(venue.id);
        } else {
            removeFavorite(venue.id);
        }
    }

    const handleCameraClick = () => {
        setShowImageModal(true);
    }

    const handleFinishImagePicking = () => {
        setShowImageModal(false);
        onEditImagesClick();
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

                <IconButton text={'Bilder bearbeiten'} icon={ICONS.GALLERY} handleOnClick={handleCameraClick} />
                <IconButton text={'Kommentar schreiben'} icon={ICONS.COMMENT} handleOnClick={onCommentClick} />
            </div>

            {showImageModal &&
                <Modal position='bottom'>
                    <ImagePicker venueId={venue.id} onFinish={handleFinishImagePicking} />
                </Modal>
            }

            {(isLoading && isFetching) &&
                <LoadingSpinner />
            }

            {addResponse &&
                <Toast colorScheme={COLOR_SCHEME.SUCCESS} text={addResponse.message} />
            }

            {removeResponse &&
                <Toast colorScheme={COLOR_SCHEME.SUCCESS} text={removeResponse.message} />
            }
        </>
    )
}

export default DetailSettings;