import IconButton from '../UI/buttons/IconButton';
import { ICONS } from '../../constants/Icons';
import ImageList from './ImageList';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import Modal from '../UI/Modal';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

type ImagePickerProps = {
    venueId: string
}

const ImagePicker = ({ venueId }: ImagePickerProps) => {

    const dispatch = useDispatch();

    const handleSelectImagesClick = () => {

    }

    const handleTakePictureClick = () => {

    }

    const handleUploadedThumbnailClick = async (id: number) => {

    }

    const handleSelectedThumbnailClick = (id: number) => {

    }

    const handleUploadImagesClick = async () => {

    }

    const handleClearImagesClick = () => {

    }

    return (
        <Modal>
            <div className="p-4 w-11/12 bg-white rounded relative">

                <div className="absolute flex justify-center right-4 top-4 z-1100">
                    <IconButton text={''} icon={ICONS.CLOSE}
                        handleOnClick={() => dispatch(uiActions.hideImagePicker())} />
                </div>


                <h2 className="mt-2 text-xl">Bilder hinzufügen</h2>

                <div className="mt-2">
                    <IconButton text={'Bilder auswählen'} icon={ICONS.UPLOAD} handleOnClick={handleSelectImagesClick} />
                    <IconButton text={'Photo aufnehmen'} icon={ICONS.CAMERA} handleOnClick={handleTakePictureClick} />
                </div>

                <div className="mt-8">
                    <h2 className="mt-2 text-xl">Ausgew&auml;hlte Bilder</h2>
                    <ImageList onThumbnailClick={handleSelectedThumbnailClick} />
                </div>

                <div className="mt-8">
                    <h2 className="mt-2 text-xl">Hochgeladene Bilder</h2>
                    <ImageList onThumbnailClick={handleUploadedThumbnailClick} />
                </div>

                <div className="flex justify-evenly my-8">
                    <div className="w-5/12">
                        <SecondaryButton text={'abbrechen'} handleOnClick={handleClearImagesClick} />
                    </div>
                    <div className="w-5/12">
                        <PrimaryButton text={'speichern'} handleOnClick={handleUploadImagesClick} />
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ImagePicker;