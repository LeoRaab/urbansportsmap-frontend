export interface ImageInterface {
    path: string
}

export class UploadImage implements ImageInterface {
    constructor(public path: string,
                public format: string) {
    }
}