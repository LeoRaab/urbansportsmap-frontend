import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/components/form-elements/buttons/Button";
import Modal from "../../common/components/UI/Modal";
import ImageGallery from "./ImageGallery";
import { selectImageManager, imageManagerActions } from "./imageManagerSlice";
import ImageUpload from "./ImageUpload";
import { CameraIcon, XIcon, PhotographIcon, UploadIcon } from "@heroicons/react/outline";
import IconButton from "../../common/components/form-elements/buttons/IconButton";
import { STRINGS } from "../../common/constants/strings";

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
                    <IconButton text="" icon={<XIcon className="icon-size"/>} onClick={() => dispatch(imageManagerActions.close())}/>    
                </div>

                {imageManager.startScreen &&
                    <>
                        <h2 className="my-6 text-xl">{STRINGS.IMAGES_EDIT}</h2>

                        <div className="mt-4 flex flex-col gap-y-2">
                            <IconButton text={STRINGS.IMAGES_UPLOAD} icon={<UploadIcon className="icon-size"/>} onClick={() => dispatch(imageManagerActions.selectImages())}/>
                            <IconButton text={STRINGS.IMAGES_MANAGE} icon={<PhotographIcon className="icon-size"/>} onClick={() => dispatch(imageManagerActions.editImages())}/>
                        </div>

                        <div className="flex justify-center my-8">
                            <div className="w-5/12">
                                <Button color="primary" type="button" onClick={() => dispatch(imageManagerActions.close())}>
                                    {STRINGS.BUTTON_OK}
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