import VenueImage from '../../common/types/VenueImage';
import Thumbnail from './Thumbnail';

type ImageListProps = {
  images: VenueImage[];
  onThumbnailClick?: (id: number) => void;
};

const ImageList = ({ images, onThumbnailClick }: ImageListProps) => {
  if (!images) {
    return null;
  }

  const imageList = images.map((image, key) => (
    <Thumbnail image={image} id={key} onThumbnailClick={onThumbnailClick} key={key} />
  ));

  return <div className="flex flex-wrap mt-2">{imageList}</div>;
};

export default ImageList;
