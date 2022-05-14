import IconButton from '../UI/buttons/IconButton';
import {ICONS} from '../../constants/Icons';
import ImageList from './ImageList';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import SecondaryButton from '../UI/buttons/SecondaryButton';

type ImagePickerProps = {
    venueId?: string,
    onFinish: () => void;
}

const ImagePicker = ({venueId, onFinish}: ImagePickerProps) => {


    const dontShow = true;

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
        <div className="mt-8 px-2">

            <h2 className="mt-2 text-xl">Bilder hinzufügen</h2>

            <div className="mt-2">
                <IconButton text={'Bilder auswählen'} icon={ICONS.UPLOAD} handleOnClick={handleSelectImagesClick}/>
                <IconButton text={'Photo aufnehmen'} icon={ICONS.CAMERA} handleOnClick={handleTakePictureClick}/>
            </div>

            {dontShow &&
                <div className="mt-8">
                    <h2 className="mt-2 text-xl">Von dir hochgeladene Bilder</h2>
                    <ImageList onThumbnailClick={handleUploadedThumbnailClick}/>
                </div>
            }

            <div className="mt-8">
                <h2 className="mt-2 text-xl">Ausgew&auml;hlte Bilder</h2>
                <ImageList onThumbnailClick={handleSelectedThumbnailClick}/>
            </div>

            <div className="flex justify-evenly mt-8">
                <div className="w-5/12">
                    <SecondaryButton text={'zurücksetzen'} handleOnClick={handleClearImagesClick}/>
                </div>
                <div className="w-5/12">
                    <PrimaryButton text={'hochladen'} handleOnClick={handleUploadImagesClick}/>
                </div>
            </div>

        </div>
    )
}

export default ImagePicker;