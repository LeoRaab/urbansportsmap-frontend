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
import { STRINGS } from '../../common/constants/strings';
import { addToast } from '../../common/components/UI/toast/toastsSlice';

type DetailSettingsProps = {
  venue: Venue;
  onCommentClick: () => void;
};

const DetailSettings = ({ venue, onCommentClick }: DetailSettingsProps) => {
  const dispatch = useDispatch();
  const { data: favorites, isLoading, isFetching } = useGetFavoritesQuery();
  const [addFavorite, { data: addResponse, error: addError }] = useAddFavoriteMutation();
  const [deleteFavorite, { data: deleteResponse, error: deleteError }] = useRemoveFavoriteMutation();
  const imageManager = useSelector(selectImageManager);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (favorites) {
      setIsFavorite(!!favorites.find((favorite) => favorite.id === venue.id));
    }
  }, [favorites, venue]);

  useEffect(() => {
    if (addResponse) {
      dispatch(addToast({ message: addResponse.message, type: 'success' }));
    }

    if (addError) {
      dispatch(addToast({ message: getErrorMessage(addError), type: 'error' }));
    }
  }, [addResponse, addError, dispatch]);

  useEffect(() => {
    if (deleteResponse) {
      dispatch(addToast({ message: deleteResponse.message, type: 'success' }));
    }

    if (deleteError) {
      dispatch(addToast({ message: getErrorMessage(deleteError), type: 'error' }));
    }
  }, [deleteResponse, deleteError, dispatch]);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      addFavorite(venue.id);
    } else {
      deleteFavorite(venue.id);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 mt-4">
        {isFavorite && (
          <IconButton
            text={STRINGS.FAVORITES_REMOVE}
            icon={<HeartIconSolid className="icon-size" />}
            onClick={handleFavoriteClick}
          />
        )}

        {!isFavorite && (
          <IconButton
            text={STRINGS.FAVORITES_ADD}
            icon={<HeartIcon className="icon-size" />}
            onClick={handleFavoriteClick}
          />
        )}

        <IconButton
          text={STRINGS.IMAGES_EDIT}
          icon={<PhotographIcon className="icon-size" />}
          onClick={() => dispatch(imageManagerActions.start())}
        />
        <IconButton
          text={STRINGS.COMMENTS_ADD}
          icon={<AnnotationIcon className="icon-size" />}
          onClick={onCommentClick}
        />
      </div>

      {imageManager.isVisible && <ImageManager venueId={venue.id} />}

      {isLoading && isFetching && <LoadingSpinner />}
    </>
  );
};

export default DetailSettings;
