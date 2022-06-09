import React, { useEffect, useState } from 'react';
import { ICONS } from '../../constants/Icons';
import IconButton from '../UI/buttons/IconButton';
import ImageUpload from '../ImageUpload/ImageUpload';
import {
    useAddFavoriteMutation, useGetFavoritesQuery,
    useRemoveFavoriteMutation
} from '../../store/api/favoritesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import Venue from '../../types/Venue';
import Toast from '../UI/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiActions } from '../../store/uiSlice';

type DetailSettingsProps = {
    venue: Venue,
    onEditImagesClick: () => void,
    onCommentClick: () => void
}

const DetailSettings = ({ venue, onCommentClick, onEditImagesClick }: DetailSettingsProps) => {
    const { data: favorites, isLoading, isFetching } = useGetFavoritesQuery();
    const [addFavorite, { data: addResponse }] = useAddFavoriteMutation();
    const [removeFavorite, { data: removeResponse }] = useRemoveFavoriteMutation();
    const dispatch = useDispatch();
    const ui = useSelector(selectUi);
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

                <IconButton text={'Bilder bearbeiten'} icon={ICONS.GALLERY} handleOnClick={() => dispatch(uiActions.showImagePicker())} />
                <IconButton text={'Kommentar schreiben'} icon={ICONS.COMMENT} handleOnClick={onCommentClick} />
            </div>

            {ui.isImagePickerVisible &&
                <ImageUpload venueId={venue.id} />
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