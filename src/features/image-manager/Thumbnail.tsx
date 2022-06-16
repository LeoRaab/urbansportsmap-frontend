import VenueImage from "../../common/types/VenueImage";
import { XIcon } from "@heroicons/react/outline";

type ThumbnailProps = {
    image: VenueImage,
    id: number,
    onThumbnailClick?: (id: number) => void;
}

const Thumbnail = ({ image, id, onThumbnailClick }: ThumbnailProps) => {
    return (
        <div className="mr-1 mt-2 relative">
            {onThumbnailClick &&
                <div className="absolute z-800 top-0 right-0 bg-white/90 rounded text-red-500 cursor-pointer" onClick={() => onThumbnailClick(id)}>
                    <XIcon className="icon-size" />
                </div>
            }
            <img src={image.url} alt={image.altText || image.url} className="w-40" />
        </div>
    )
}

export default Thumbnail;