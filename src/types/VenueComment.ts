export class VenueComment {
    constructor(public id: number,
                public uid: string,
                public comment: string,
                public author: string,
                public date: string) {
    }
}

export interface DatabaseComment {
    id: number,
    uid: string,
    comment: string,
    profiles: {
        username: string
    },
    updated_at: string
}

export default VenueComment;