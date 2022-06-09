import { UploadImage } from '../types/Images';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from 'react';

const useCamera = () => {

    const [images, setImages] = useState<UploadImage[]>([]);

    const takePicture = async (): Promise<void | null> => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });

        if (!image.webPath) return null;

        const uploadImage = new UploadImage(image.webPath, image.format);

        setImages(prevState => [...prevState, uploadImage]);
    }

    const selectImages = async (): Promise<void | null> => {
        const images = await Camera.pickImages({
            quality: 90,
        });

        if (!images || images.photos.length === 0) return null;

        const uploadImages = images.photos
            .map(image => new UploadImage(image.webPath, image.format));

        setImages(prevState => [...prevState, ...uploadImages]);
    }

    const removeImage = (id: number) => {
        setImages(prevState => prevState.filter((image, index) => {
            return id !== index
        }));
    }

    return { takePicture, selectImages, removeImage, images }
}

export default useCamera;