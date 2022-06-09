import Icon from '../UI/Icon';
import {ICONS} from '../../constants/Icons';

type ThumbnailProps = {
    image: string,
    id: number,
    onThumbnailClick: (id: number) => void;
}

const Thumbnail = ({image, id, onThumbnailClick}: ThumbnailProps) => {
    return (
        <div className="mr-1 mt-2 relative" onClick={() => onThumbnailClick(id)}>
            <div className="absolute z-800 top-0 right-0 text-red-500">
                <Icon icon={ICONS.CLOSE}/>
            </div>
            <img src={image} alt={image} className="w-20"/>
        </div>
    )
}

export default Thumbnail;