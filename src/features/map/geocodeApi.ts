import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {FeatureCollection} from 'geojson';
import { GeocodeWebEntity } from '../../common/types/WebEntities';

export const geocodeApi = createApi({
    reducerPath: 'geocodeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://data.wien.gv.at/daten/OGDAddressService.svc/'}),
    endpoints: builder => ({
        getGeocode: builder.query<GeocodeWebEntity[], string>({
            query: searchTerm => 'GetAddressInfo?Address=' + searchTerm + '&crs=EPSG:4326',
            transformResponse: (responseData: FeatureCollection) => {
                return responseData.features.map((geocodeJson: any) => {
                    return {
                        address: geocodeJson.properties.Adresse,
                        coordinates: geocodeJson.geometry.coordinates
                    }
                }).slice(0, 10);
            }
        }),
        getReverseGeocode: builder.query<GeocodeWebEntity, string>({
            query: stringCoordinates => 'ReverseGeocode?location=' + stringCoordinates + '&crs=EPSG:4326',
            transformResponse: (responseData: FeatureCollection) => {
                return responseData.features.map((geocodeJson: any) => {
                    const address = geocodeJson.properties.Adresse + ', ' + geocodeJson.properties.PostalCode + ' ' + geocodeJson.properties.Municipality;
                    return {
                        address,
                        coordinates: geocodeJson.geometry.coordinates
                    }
                })[0]
            }
        })
    })
})

export const {
    useLazyGetGeocodeQuery,
    useLazyGetReverseGeocodeQuery
} = geocodeApi;