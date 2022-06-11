import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '../UI/buttons/IconButton';
import { ICONS } from '../../constants/Icons';
import ImageList from './ImageList';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import Modal from '../UI/Modal';
import { uiActions } from '../../store/uiSlice';
import useCamera from '../../hooks/use-camera';
import { useUploadImagesMutation, useGetImagesByVenueAndUserQuery, useDeleteImageMutation } from '../../store/api/imagesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import Toast from '../UI/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';
import VenueImage from '../../types/VenueImage';

type ImageUploadProps = {
    venueId: string
}

const ImageUpload = ({ venueId }: ImageUploadProps) => {
    const dispatch = useDispatch();
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedPreviewImages, setSelectedPreviewImages] = useState<VenueImage[]>([]);
    const [uploadImages, { data: uploadImageResponse, isLoading, isSuccess, isError, error }] = useUploadImagesMutation();
    const { data: userImages } = useGetImagesByVenueAndUserQuery(venueId);
    const [deleteImage, { data: deleteImageResponse }] = useDeleteImageMutation();
    const camera = useCamera();

    useEffect(() => {
        setSelectedPreviewImages(selectedImages.map(image => {
            return {
                url: URL.createObjectURL(image)
            }
        }));
    }, [selectedImages]);

    const handleSelectImagesClick = () => {
        filePickerRef.current?.click();
    }

    const handleImagesSelected: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files !== null && event.target.files.length > 0) {

            const pickedImages = [...event.target.files];

            setSelectedImages(prevState => [
                ...prevState,
                ...pickedImages
                    .filter(pickedImage => !selectedImages.find(prevState => prevState.name === pickedImage.name))
            ]);
        }
    }

    const handleTakePictureClick = () => {
        camera.takePicture();
    }

    const handleSelectedThumbnailClick = (id: number) => {
        setSelectedImages(prevState => [...prevState.filter((selectedImage, index) => index !== id)]);
    }

    const handleUploadedThumbnailClick = (id: number) => {
        if (!userImages) {
            return;
        }

        const imageId = userImages[id].id;

        if (imageId) {
            deleteImage(imageId);
        }
    }

    const handleUploadImagesClick = async () => {
        if (selectedImages.length > 0) {
            const formData = new FormData();

            for (const image of selectedImages) {
                formData.append("images", image);
            }

            uploadImages({ venueId, uploadImages: formData });
        }
    }

    return (
        <>
            <Modal>
                <div className="p-4 w-11/12 bg-white rounded relative">

                    <div className="absolute flex justify-center right-4 top-4 z-1100">
                        <IconButton text={''} icon={ICONS.CLOSE}
                            handleOnClick={() => dispatch(uiActions.hideImagePicker())} />
                    </div>

                    <h2 className="mt-2 text-xl">Bilder hinzufügen</h2>

                    <div className="mt-2">
                        <input ref={filePickerRef} id="images" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImagesSelected} multiple />                        
                        <IconButton text={'Bilder auswählen'} icon={ICONS.UPLOAD} handleOnClick={handleSelectImagesClick} />
                        <div className="my-2"></div>
                        <IconButton text={'Photo aufnehmen'} icon={ICONS.CAMERA} handleOnClick={handleTakePictureClick} />
                    </div>

                    {(selectedImages.length > 0) &&
                        <ImageList title="Ausgewählte Bilder" images={selectedPreviewImages} onThumbnailClick={handleSelectedThumbnailClick} />
                    }

                    {(userImages && userImages.length > 0) &&
                        <ImageList title="Hochgeladene Bilder" images={userImages} onThumbnailClick={handleUploadedThumbnailClick} />
                    }

                    <div className="flex justify-between my-8">
                        <div className="w-5/12">
                            <SecondaryButton text={'abbrechen'} handleOnClick={() => dispatch(uiActions.hideImagePicker())} />
                        </div>
                        <div className="w-5/12">
                            <PrimaryButton text={'speichern'} handleOnClick={handleUploadImagesClick} />
                        </div>
                    </div>

                </div>
            </Modal>

            {(isLoading && !isError && !isSuccess) && <LoadingSpinner />}

            {(isSuccess && uploadImageResponse) && <Toast text={uploadImageResponse.message} colorScheme={COLOR_SCHEME.SUCCESS} />}

            {deleteImageResponse && <Toast text={deleteImageResponse.message} colorScheme={COLOR_SCHEME.SUCCESS} />}

            {(isError && uploadImageResponse) && <Toast text={uploadImageResponse.message} colorScheme={COLOR_SCHEME.ERROR} />}
        </>
    )
}

export default ImageUpload;