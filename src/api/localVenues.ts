/**
 * TODO: Put LocalStorage Key in Config
 */
import {VenueWebEntity} from '../types/WebEntities';

const VENUE_STORAGE_KEY = 'USM-VenueWebEntities';

export const loadVenuesFromLocalStorage = (): VenueWebEntity[] => {
    const loadedVenues = localStorage.getItem(VENUE_STORAGE_KEY);

    if (!loadedVenues) {
        throw new Error();
    }

    return JSON.parse(loadedVenues);
}

export const saveVenuesToLocalStorage = (venueWebEntities: VenueWebEntity[]) => {
    localStorage.setItem(VENUE_STORAGE_KEY, JSON.stringify(venueWebEntities));
}

export const isVenuesInLocalStorage = (): boolean => {
    return localStorage.getItem(VENUE_STORAGE_KEY) !== null;
}