import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../../common/components/form-elements/buttons/Button";
import LoadingSpinner from "../../common/components/UI/LoadingSpinner";
import { toastsActions } from "../../common/components/UI/toast/toastsSlice";
import useDialog from "../../common/hooks/use-dialog";
import ImageList from "./ImageList";
import { imageManagerActions } from "./imageManagerSlice";
import { useGetImagesByVenueAndUserQuery, useDeleteImageMutation } from "./imagesApi";

type ImageGalleryProps = {
    venueId: string
}

const ImageGallery = ({ venueId }: ImageGalleryProps) => {

    const dispatch = useDispatch();
    const { data: userImages, isLoading, isFetching, isError: isLoadingError, error: loadingError } = useGetImagesByVenueAndUserQuery(venueId);
    const [deleteImage, { data: deleteResponse, isError: isDeleteError, error: deleteError }] = useDeleteImageMutation();
    const dialog = useDialog();

    useEffect(() => {
        if (deleteResponse) {
            dispatch(toastsActions.addToast({message: deleteResponse.message, type: 'success'}));
        }

        if (isDeleteError) {
            dispatch(toastsActions.addToast({message: 'deleteError', type: 'error'}));
        }
    }, [dispatch, deleteResponse, isDeleteError, deleteError]);

    useEffect(() => {
        if (isLoadingError) {
            dispatch(toastsActions.addToast({message: 'deleteError', type: 'error'}));
        }
    }, [dispatch, isLoadingError, loadingError])

    const handleUploadedThumbnailClick = async (id: number) => {
        const isAccepted = await dialog.open('Willst du das Bild wirklich löschen?');

        if (isAccepted) {
            handleDeleteImage(id);
        }
    }

    const handleDeleteImage = (id: number) => {
        if (!userImages) {
            return;
        }

        const imageId = userImages[id].id;

        if (imageId) {
            deleteImage(imageId);
        }
    }

    return (
        <>
            <h2 className="my-6 text-xl">Bilder verwalten</h2>

            {(!userImages || userImages.length === 0) &&
                <p>Du hast noch keine Bilder hochgeladen</p>
            }

            {(userImages && userImages.length > 0) &&
                <ImageList images={userImages} onThumbnailClick={handleUploadedThumbnailClick} />
            }

            <div className="flex justify-center my-8">
                <div className="w-5/12">
                    <Button color="secondary" type="button" onClick={() => dispatch(imageManagerActions.show())}>
                        zurück
                    </Button>
                </div>
            </div>

            {(isLoading || isFetching) &&
                <LoadingSpinner />
            }
        </>
    )
}

export default ImageGallery;