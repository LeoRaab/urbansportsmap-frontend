import Venue from '../types/Venue';
import { SPORT_TYPE } from '../types/SportType';

export const hasVenueSportType = (venue: Venue, filters: SPORT_TYPE[]): boolean => {
  return filters.every((filter) => venue.sportTypes.includes(filter));
};
