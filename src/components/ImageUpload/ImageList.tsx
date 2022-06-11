import Thumbnail from './Thumbnail';
import VenueImage from '../../types/VenueImage';

type ImageListProps = {
    title: string,
    images: VenueImage[],
    onThumbnailClick?: (id: number) => void
}

const ImageList = ({ title, images, onThumbnailClick }: ImageListProps) => {

    if (!images) {
        return null;
    }

    const imageList = images.map((image, key) =>
        <Thumbnail image={image} id={key} onThumbnailClick={onThumbnailClick} key={key} />
    );

    return (
        <div className="mt-8">
            <h2 className="mt-2 text-lg">{ title }</h2>
            <div className="flex flex-wrap mt-2">
                {imageList}
            </div>
        </div>
    )
}

export default ImageList;