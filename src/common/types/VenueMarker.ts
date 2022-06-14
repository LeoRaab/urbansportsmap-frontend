import L, {LatLngExpression, MarkerOptions} from 'leaflet';
import Venue from './Venue';

export class VenueMarker extends L.Marker {
    constructor(public latlng: LatLngExpression, options?: VenueMarkerOptions) {
        super(latlng, options);
    }
}

export interface VenueMarkerOptions extends MarkerOptions {
    venue: Venue;
}

