import Thumbnail from './Thumbnail';
import {ImageInterface} from '../../types/Images';

type ImageListProps = {
    images?: ImageInterface[],
    onThumbnailClick: (id: number) => void
}

const ImageList = ({images, onThumbnailClick}: ImageListProps) => {

    if (!images) {
        return null;
    }

    const imageList = images.map((image, key) =>
        <Thumbnail image={image.path} id={key} onThumbnailClick={onThumbnailClick} key={key}/>
    );

    return (
        <div className="flex flex-wrap mt-2">
            {imageList}
        </div>
    )
}

export default ImageList;