import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '../UI/buttons/IconButton';
import { ICONS } from '../../constants/Icons';
import ImageList from './ImageList';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import Modal from '../UI/Modal';
import { uiActions } from '../../store/uiSlice';
import useCamera from '../../hooks/use-camera';
import { useAddImagesMutation } from '../../store/api/imagesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import Toast from '../UI/Toast';
import COLOR_SCHEME from '../../types/ColorScheme';

type ImageUploadProps = {
    venueId: string
}

const ImageUpload = ({ venueId }: ImageUploadProps) => {
    const dispatch = useDispatch();
    const [addImages, { data: addImageResponse, isLoading, isSuccess, isError, error }] = useAddImagesMutation();
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const camera = useCamera();

    const selectImagesHandler = () => {
        filePickerRef.current?.click();
    }

    const imagesSelectedHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            const images = Array.from(event.target.files);
            setSelectedImages(prevState => [...prevState, ...images])
        }
    }

    const handleTakePictureClick = () => {
        camera.takePicture();
    }

    const handleUploadedThumbnailClick = async (id: number) => {

    }

    const handleSelectedThumbnailClick = (id: number) => {
        camera.removeImage(id);
    }

    const handleUploadImagesClick = async () => {
        console.log(filePickerRef.current?.value);
        const formData = new FormData();
        formData.append('image', filePickerRef.current!.files![0]);
        formData.append('altText', 'uploading');

        addImages({ venueId, uploadImages: formData })

        /*

        if (filePickerRef.current?.files) {
            const files = [...filePickerRef.current.files];
            const formData = new FormData();

            for (const image of files) {
                formData.append("images", image);
            }    

            addImages({ venueId, uploadImages: formData });
        }
        */
    }

    const handleClearImagesClick = () => {

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
                        <input ref={filePickerRef} id="images" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={imagesSelectedHandler} multiple />
                        <IconButton text={'Bilder auswählen'} icon={ICONS.UPLOAD} handleOnClick={selectImagesHandler} />
                        <IconButton text={'Photo aufnehmen'} icon={ICONS.CAMERA} handleOnClick={handleTakePictureClick} />
                    </div>

                    <div className="mt-8">
                        <h2 className="mt-2 text-xl">Ausgew&auml;hlte Bilder</h2>
                        <ImageList images={camera.images} onThumbnailClick={handleSelectedThumbnailClick} />
                    </div>

                    <div className="mt-8">
                        <h2 className="mt-2 text-xl">Hochgeladene Bilder</h2>
                        <ImageList onThumbnailClick={handleUploadedThumbnailClick} />
                    </div>

                    <div className="flex justify-between my-8">
                        <div className="w-5/12">
                            <SecondaryButton text={'abbrechen'} handleOnClick={handleClearImagesClick} />
                        </div>
                        <div className="w-5/12">
                            <PrimaryButton text={'speichern'} handleOnClick={handleUploadImagesClick} />
                        </div>
                    </div>

                </div>
            </Modal>

            {(isLoading && !isError && !isSuccess) && <LoadingSpinner />}

            {(isSuccess && addImageResponse) && <Toast text={addImageResponse.message} colorScheme={COLOR_SCHEME.SUCCESS} />}

            {(isError && addImageResponse) && <Toast text={addImageResponse.message} colorScheme={COLOR_SCHEME.ERROR} />}
        </>
    )
}

export default ImageUpload;