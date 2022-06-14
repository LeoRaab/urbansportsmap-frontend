import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '../../components/UI/buttons/IconButton';
import { ICONS } from '../../constants/Icons';
import ImageList from './ImageList';
import { uiActions } from '../../store/uiSlice';
import { useUploadImagesMutation } from '../../store/api/imagesApi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Toast from '../../components/UI/Toast/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';
import VenueImage from '../../types/VenueImage';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import { imageManagerActions } from '../../store/imageManagerSlice';
import SecondaryButton from '../../components/UI/buttons/SecondaryButton';
import useToast from '../../hooks/use-toast';

type ImageUploadProps = {
    venueId: string
}

const ImageUpload = ({ venueId }: ImageUploadProps) => {
    const dispatch = useDispatch();
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedPreviewImages, setSelectedPreviewImages] = useState<VenueImage[]>([]);
    const [uploadImages, { data: uploadImageResponse, isLoading, isSuccess, isError, error }] = useUploadImagesMutation();
    const toast = useToast();

    useEffect(() => {
        setSelectedPreviewImages(selectedImages.map(image => {
            return {
                url: URL.createObjectURL(image)
            }
        }));
    }, [selectedImages]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(imageManagerActions.show());
        }
    }, [isSuccess]);

    useEffect(() => {
        if (uploadImageResponse) {
            toast.show(uploadImageResponse.message, COLOR_SCHEME.SUCCESS)
        }
    }, [uploadImageResponse]);

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

    const handleSelectedThumbnailClick = (id: number) => {
        setSelectedImages(prevState => [...prevState.filter((selectedImage, index) => index !== id)]);
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
            <h2 className="my-6 text-xl">Bilder hochladen</h2>
            <div className="my-2">
                {(selectedImages.length === 0) &&
                    <p>Keine Bilder ausgewählt</p>
                }

                {(selectedImages.length > 0) &&
                    <ImageList images={selectedPreviewImages} onThumbnailClick={handleSelectedThumbnailClick} />
                }
            </div>
            <div className="mt-4">
                <input ref={filePickerRef} id="images" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImagesSelected} multiple />
                <IconButton text={'Bilder auswählen'} icon={ICONS.UPLOAD} handleOnClick={handleSelectImagesClick} />
            </div>

            <div className="flex justify-between my-8">
                <div className="w-5/12">
                    <SecondaryButton text={'zurück'} handleOnClick={() => dispatch(imageManagerActions.show())} />
                </div>
                <div className="w-5/12">
                    <PrimaryButton text={'hochladen'} handleOnClick={handleUploadImagesClick} />
                </div>
            </div>


            {(isLoading && !isError && !isSuccess) && <LoadingSpinner />}
        </>
    )
}

export default ImageUpload;