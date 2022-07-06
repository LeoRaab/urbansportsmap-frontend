import { SPORT_TYPE } from './SportType';

interface Venue {
  id: string;
  name: string;
  sportTypes: SPORT_TYPE[];
  location: {
    lat: number;
    lng: number;
  };
}

export default Venue;
