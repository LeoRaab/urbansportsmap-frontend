import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../common/components/form-elements/buttons/Button';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import { STRINGS } from '../../common/constants/strings';
import useDialog from '../../common/hooks/use-dialog';
import getErrorMessage from '../../common/util/get-error-message';
import ImageList from './ImageList';
import { imageManagerActions } from './imageManagerSlice';
import { useGetImagesByVenueAndUserQuery, useDeleteImageMutation } from './imagesApi';

type ImageGalleryProps = {
  venueId: string;
};

const ImageGallery = ({ venueId }: ImageGalleryProps) => {
  const dispatch = useDispatch();
  const { data: userImages, isLoading, isFetching, error: loadingError } = useGetImagesByVenueAndUserQuery(venueId);
  const [deleteImage, { data: deleteResponse, isLoading: isLoadingDeleteImage, error: deleteError }] =
    useDeleteImageMutation();
  const dialog = useDialog();

  useEffect(() => {
    if (deleteResponse) {
      dispatch(addToast({ message: deleteResponse.message, type: 'success' }));
    }

    if (deleteError) {
      dispatch(addToast({ message: getErrorMessage(deleteError), type: 'error' }));
    }

    if (loadingError) {
      dispatch(addToast({ message: getErrorMessage(loadingError), type: 'error' }));
    }
  }, [deleteResponse, deleteError, loadingError, dispatch]);

  const handleUploadedThumbnailClick = async (id: number) => {
    const isAccepted = await dialog.open(STRINGS.DIALOG_DELETE_IMAGE);

    if (isAccepted) {
      handleDeleteImage(id);
    }
  };

  const handleDeleteImage = (id: number) => {
    if (!userImages) {
      return;
    }

    const imageId = userImages[id].id;

    if (imageId) {
      deleteImage(imageId);
    }
  };

  return (
    <>
      <h2 className="my-6 text-xl">{STRINGS.IMAGES_MANAGE}</h2>

      {(!userImages || userImages.length === 0) && <p>{STRINGS.IMAGES_NONE_UPLOADED}</p>}

      {userImages && userImages.length > 0 && (
        <ImageList images={userImages} onThumbnailClick={handleUploadedThumbnailClick} />
      )}

      <div className="flex justify-center my-8">
        <div className="w-5/12">
          <Button color="secondary" type="button" onClick={() => dispatch(imageManagerActions.close())}>
            {STRINGS.BUTTON_BACK}
          </Button>
        </div>
      </div>

      {(isLoading || isFetching || isLoadingDeleteImage) && <LoadingSpinner />}
    </>
  );
};

export default ImageGallery;
