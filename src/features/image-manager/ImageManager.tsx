import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/components/form-elements/Button";
import Modal from "../../common/components/UI/Modal";
import ImageGallery from "./ImageGallery";
import { selectImageManager, imageManagerActions } from "./imageManagerSlice";
import ImageUpload from "./ImageUpload";
import { CameraIcon, XIcon, PhotographIcon, UploadIcon } from "@heroicons/react/outline";
import IconButton from "../../common/components/UI/buttons/IconButton";

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
                    <IconButton text="" icon={<XIcon/>} onClick={() => dispatch(imageManagerActions.hide())}/>    
                </div>

                {imageManager.startScreen &&
                    <>
                        <h2 className="my-6 text-xl">Bilder bearbeiten</h2>

                        <div className="mt-4">
                            <IconButton text="Bilder hochladen" icon={<UploadIcon/>} onClick={() => dispatch(imageManagerActions.selectImages())}/>
                            <div className="my-3"></div>
                            <IconButton text="Photo aufnehmen" icon={<CameraIcon/>} onClick={() => dispatch(imageManagerActions.show())}/>
                            <div className="my-3"></div>
                            <IconButton text="Bilder auswählen" icon={<PhotographIcon/>} onClick={() => dispatch(imageManagerActions.editImages())}/>
                        </div>

                        <div className="flex justify-center my-8">
                            <div className="w-5/12">
                                <Button color="primary" type="button" onClick={() => dispatch(imageManagerActions.hide())}>
                                    ok
                                </Button>
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