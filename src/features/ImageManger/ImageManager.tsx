import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/UI/buttons/IconButton";
import PrimaryButton from "../../components/UI/buttons/PrimaryButton";
import Modal from "../../components/UI/Modal";
import { ICONS } from "../../constants/Icons";
import { imageManagerActions, selectImageManager } from "../../store/imageManagerSlice";
import ImageGallery from "./ImageGallery";
import ImageUpload from "./ImageUpload";

type ImageManagerProps = {
    venueId: string
}

const ImageManager = ({ venueId }: ImageManagerProps) => {

    const dispatch = useDispatch();
    const imageManager = useSelector(selectImageManager);

    return (
        <Modal>
            <div className="p-4 w-11/12 bg-white rounded relative">
                <div className="absolute flex justify-center right-4 top-4 z-1100">
                    <IconButton text={''} icon={ICONS.CLOSE}
                        handleOnClick={() => dispatch(imageManagerActions.hide())} />
                </div>

                {imageManager.startScreen &&
                    <>
                        <h2 className="my-6 text-xl">Bilder bearbeiten</h2>

                        <div className="mt-4">
                            <IconButton text={'Bilder hochladen'} icon={ICONS.UPLOAD} handleOnClick={() => dispatch(imageManagerActions.selectImages())} />
                            <div className="my-3"></div>
                            <IconButton text={'Photo aufnehmen'} icon={ICONS.CAMERA} handleOnClick={() => dispatch(imageManagerActions.show())} />
                            <div className="my-3"></div>
                            <IconButton text={'Bilder auswählen'} icon={ICONS.GALLERY} handleOnClick={() => dispatch(imageManagerActions.editImages())} />
                        </div>

                        <div className="flex justify-center my-8">
                            <div className="w-5/12">
                                <PrimaryButton text={'ok'} handleOnClick={() => dispatch(imageManagerActions.hide())} />
                            </div>
                        </div>
                    </>
                }

                {imageManager.selectImages && <ImageUpload venueId={venueId} />}

                {imageManager.editImages && <ImageGallery venueId={venueId} />}
            </div>
        </Modal>
    )
}

export default ImageManager;