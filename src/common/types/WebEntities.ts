export interface VenueWebEntity {
    objectId: number,
    name: string,
    sportTypes: string,
    coordinates: number[]
}

export interface GeocodeWebEntity {
    address: string,
    coordinates: number[]
}