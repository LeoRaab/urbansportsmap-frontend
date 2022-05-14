import L from 'leaflet';

export interface AppConfig {
    mapConfig: MapConfig
}

interface MapConfig {
    INIT_POSITION: L.LatLng,
    INIT_ZOOM: number,
    ZOOM_CONTROL_ENABLED: boolean,
    RENDER_RADIUS: number
}