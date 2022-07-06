export interface VenueComment {
  id: string;
  author: {
    id: string;
    name: string;
  };
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export default VenueComment;
