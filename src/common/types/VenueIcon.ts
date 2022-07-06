import L from 'leaflet';
import markerShadowImage from '../../assets/images/marker/marker_shadow.png';
import allSportsMarkerImage from '../../assets/images/marker/all_sports_marker.png';

export class VenueIcon extends L.Icon {
  constructor(private iconUrl: string = allSportsMarkerImage) {
    super({
      iconUrl,
      shadowUrl: markerShadowImage,
      iconSize: [32, 48],
      iconAnchor: [17, 47],
      shadowSize: [38, 50],
      shadowAnchor: [10, 50],
    });
  }
}
