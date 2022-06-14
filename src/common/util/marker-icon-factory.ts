import {Icon} from 'leaflet';
import {MARKER_ICON_IMAGES} from '../constants/marker-icon-images';
import {VenueIcon} from '../types/VenueIcon';
import {SPORT_TYPE} from '../types/SportType';

export const markerIconFactory = (sportTypes: SPORT_TYPE[]): Icon => {

    const markerIconImage = MARKER_ICON_IMAGES.filter(markerIconImage => {

        return markerIconImage.sportTypes.length === sportTypes.length
            && sportTypes.every(sportType => markerIconImage.sportTypes.includes(sportType));
    });

    return new VenueIcon(markerIconImage[0]?.imageUrl)
}