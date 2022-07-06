import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import VenueImage from '../../common/types/VenueImage';
import ImageList from './ImageList';
import { imageManagerActions } from './imageManagerSlice';
import { useUploadImagesMutation } from './imagesApi';
import { UploadIcon } from '@heroicons/react/outline';
import Button from '../../common/components/form-elements/buttons/Button';
import IconButton from '../../common/components/form-elements/buttons/IconButton';
import getErrorMessage from '../../common/util/get-error-message';
import { addToast } from '../../common/components/UI/toast/toastsSlice';

type ImageUploadProps = {
  venueId: string;
};

const ImageUpload = ({ venueId }: ImageUploadProps) => {
  const dispatch = useDispatch();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedPreviewImages, setSelectedPreviewImages] = useState<VenueImage[]>([]);
  const [uploadImages, { data: uploadImageResponse, isLoading, isSuccess, error }] = useUploadImagesMutation();

  useEffect(() => {
    setSelectedPreviewImages(
      selectedImages.map((image) => {
        return {
          url: URL.createObjectURL(image),
        };
      }),
    );
  }, [selectedImages]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(imageManagerActions.start());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (uploadImageResponse) {
      dispatch(addToast({ message: uploadImageResponse.message, type: 'success' }));
    }

    if (error) {
      dispatch(addToast({ message: getErrorMessage(error), type: 'error' }));
    }
  }, [uploadImageResponse, error, dispatch]);

  const handleSelectImagesClick = () => {
    filePickerRef.current?.click();
  };

  const handleImagesSelected: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files !== null && event.target.files.length > 0) {
      const pickedImages = [...event.target.files];

      setSelectedImages((prevState) => [
        ...prevState,
        ...pickedImages.filter(
          (pickedImage) => !selectedImages.find((prevState) => prevState.name === pickedImage.name),
        ),
      ]);
    }
  };

  const handleSelectedThumbnailClick = (id: number) => {
    setSelectedImages((prevState) => [...prevState.filter((selectedImage, index) => index !== id)]);
  };

  const handleUploadImagesClick = async () => {
    if (selectedImages.length > 0) {
      const formData = new FormData();

      for (const image of selectedImages) {
        formData.append('images', image);
      }

      uploadImages({ venueId, uploadImages: formData });
    }
  };

  return (
    <>
      <h2 className="my-6 text-xl">Bilder hochladen</h2>
      <div className="my-2">
        {selectedImages.length === 0 && <p>Keine Bilder ausgewählt</p>}

        {selectedImages.length > 0 && (
          <ImageList images={selectedPreviewImages} onThumbnailClick={handleSelectedThumbnailClick} />
        )}
      </div>
      <div className="mt-4">
        <input
          ref={filePickerRef}
          id="images"
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png"
          onChange={handleImagesSelected}
          multiple
        />
        <IconButton
          text="Bilder auswählen"
          icon={<UploadIcon className="icon-size" />}
          onClick={handleSelectImagesClick}
        />
      </div>

      <div className="flex justify-between my-8">
        <div className="w-5/12">
          <Button color="secondary" type="button" onClick={() => dispatch(imageManagerActions.start())}>
            zurück
          </Button>
        </div>
        <div className="w-5/12">
          <Button color="primary" type="button" onClick={handleUploadImagesClick}>
            hochladen
          </Button>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ImageUpload;
