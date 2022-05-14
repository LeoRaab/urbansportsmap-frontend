import {VenueWebEntity} from '../types/WebEntities';
/*
export const fetchSportFacilities = (): Promise<VenueWebEntity[]> => {
    return new Promise<VenueWebEntity[]>(async (resolve, reject) => {
        const response = await fetch('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPORTSTAETTENOGD&srsName=EPSG:4326&outputFormat=json');

        if (response.ok) {
            const venuesJson = await response.json();
            const venueWebEntities = venuesJson.features.map((venueJson: any) => {

                return new VenueWebEntity(
                    venueJson.properties.OBJECTID,
                    extractSportFacilityName(venueJson.properties.ADRESSE),
                    venueJson.properties.SPORTSTAETTEN_ART,
                    venueJson.geometry.coordinates)
            });

            resolve(venueWebEntities);
        } else {
            console.log('Failure fetching SportFacilities');
            reject();
        }
    });

}


export const fetchPlaygrounds = (): Promise<VenueWebEntity[]> => {
    return new Promise<VenueWebEntity[]>(async (resolve, reject) => {
        const response = await fetch('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPIELPLATZPUNKTOGD&srsName=EPSG:4326&outputFormat=json');

        if (response.ok) {
            const venuesJson = await response.json();
            const venueWebEntities = venuesJson.features.map((venueJson: any) => {
                return new VenueWebEntity(
                    venueJson.properties.OBJECTID,
                    venueJson.properties.ANL_NAME,
                    venueJson.properties.SPIELPLATZ_DETAIL,
                    venueJson.geometry.coordinates)
            });

            resolve(venueWebEntities);
        } else {
            console.log('Failure fetching Playgrounds');
            reject();
        }
    });

}

 */

/**
 * Extracts the SportFacility Name because it's surrounded with district-number and other unnecessary infos.
 * First split the given SportFacility string to an array using (,) as split separator.
 * Hence, some SportFacilities have more than the district-number in front of the needed info, we have to check the
 * length and use the part of the array, which holds the info we want.
 * Last we have to check if there are any numbers and other unnecessary infos at the of the string, if yes we cut it.
 *
 * @param sportFacilityText
 */
export const extractSportFacilityName = (sportFacilityText: string): string => {
    const splitText = sportFacilityText.split(',');
    let extractedName: string;

    if (splitText.length > 2) {
        extractedName = splitText[2];
    } else {
        extractedName = splitText[1];
    }

    const foundNumber = extractedName.search(/[0-9]/);

    if (foundNumber > -1) {
        extractedName = extractedName.substring(0, foundNumber);
    }

    return extractedName;
}
