import {GeocodeWebEntity} from '../types/WebEntities';
import L from 'leaflet';
/*
export const fetchGeocode = (searchTerm: string): Promise<GeocodeWebEntity[]> => {
    return new Promise<GeocodeWebEntity[]>(async (resolve, reject) => {
        const response = await fetch('https://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address='+ searchTerm + '&crs=EPSG:4326');
        if (response.ok) {
            const geocodesJson = await response.json();
            const geocodeWebEntities = geocodesJson.features.map((geocodeJson: any) => {
                return new GeocodeWebEntity(geocodeJson.properties.Adresse, geocodeJson.geometry.coordinates)});

            resolve(geocodeWebEntities);
        } else {
            console.log('Failure fetching SportFacilities');
            reject();
        }
    });

}

export const fetchReverseGeocode = (coordinates: L.LatLng): Promise<GeocodeWebEntity> => {
    const stringCoordinates = coordinates.lng + ',' + coordinates.lat;

    return new Promise<GeocodeWebEntity>(async (resolve, reject) => {
        const response = await fetch('https://data.wien.gv.at/daten/OGDAddressService.svc/ReverseGeocode?location='+ stringCoordinates + '&crs=EPSG:4326');
        if (response.ok) {
            const geocodesJson = await response.json();
            const geocodeWebEntities = geocodesJson.features.map((geocodeJson: any) => {
                const address = geocodeJson.properties.Adresse + ', ' + geocodeJson.properties.PostalCode + ' ' + geocodeJson.properties.Municipality
                return new GeocodeWebEntity(address, geocodeJson.geometry.coordinates)});

            resolve(geocodeWebEntities[0]);
        } else {
            console.log('Failure fetching SportFacilities');
            reject();
        }
    });

}
 */