import { SPORT_TYPE } from '../types/SportType';

export const getSportTypeColor = (sportType: SPORT_TYPE): string => {
  switch (sportType) {
    case SPORT_TYPE.BASKETBALL:
      return 'bg-sky-300';
    case SPORT_TYPE.FITNESS:
      return 'bg-amber-300';
    case SPORT_TYPE.SOCCER:
      return 'bg-emerald-300';
    case SPORT_TYPE.TABLE_TENNIS:
      return 'bg-fuchsia-300';
  }
};
