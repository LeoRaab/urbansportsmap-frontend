import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SecondaryButton from "../../components/UI/buttons/SecondaryButton";
import useDialog from "../../hooks/use-dialog";
import useToast from "../../hooks/use-toast";
import { useDeleteImageMutation, useGetImagesByVenueAndUserQuery } from "../../store/api/imagesApi";
import { imageManagerActions } from "../../store/imageManagerSlice";
import COLOR_SCHEME from "../../types/ColorScheme";
import ImageList from "./ImageList";

type ImageGalleryProps = {
    venueId: string
}

const ImageGallery = ({ venueId }: ImageGalleryProps) => {

    const dispatch = useDispatch();
    const { data: userImages } = useGetImagesByVenueAndUserQuery(venueId);
    const [deleteImage, { data: deleteResponse }] = useDeleteImageMutation();
    const toast = useToast();
    const dialog = useDialog();

    useEffect(() => {
        if (deleteResponse) {
            toast.show(deleteResponse.message, COLOR_SCHEME.SUCCESS);
        }
    }, [deleteResponse]);

    const handleUploadedThumbnailClick = async (id: number) => {
        const isAccepted = await dialog.open('Willst du das Bild wirklich löschen?');

        if (isAccepted) {
            handleDeleteImageClick(id);
        }
    }

    const handleDeleteImageClick = (id: number) => {
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
            <h2 className="my-6 text-xl">Bilder auswählen</h2>

            {(!userImages || userImages.length === 0) &&
                <p>Du hast noch keine Bilder hochgeladen</p>
            }

            {(userImages && userImages.length > 0) &&
                <ImageList images={userImages} onThumbnailClick={handleUploadedThumbnailClick} />
            }

            <div className="flex justify-center my-8">
                <div className="w-5/12">
                    <SecondaryButton text={'zurück'} handleOnClick={() => dispatch(imageManagerActions.show())} />
                </div>
            </div>
        </>
    )
}

export default ImageGallery;