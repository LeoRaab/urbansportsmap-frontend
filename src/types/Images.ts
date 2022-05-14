export interface ImageInterface {
    path: string
}

export class UploadImage implements ImageInterface {
    constructor(public path: string,
                public format: string) {
    }
}

export class VenueImage implements ImageInterface {
    constructor(public objectId: number,
                public uid: string,
                public path: string,
                public altText: string,
                public id: number = 0) {
    }
}