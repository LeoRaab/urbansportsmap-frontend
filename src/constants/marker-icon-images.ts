import allSportsMarkerImage from '../assets/images/marker/all_sports_marker.png';
import basketballMarkerImage from '../assets/images/marker/basketball_marker.png';
import basketballFitnessMarkerImage from '../assets/images/marker/basketball_fitness_marker.png';
import basketballSoccerMarkerImage from '../assets/images/marker/basketball_soccer_marker.png';
import fitnessMarkerImage from '../assets/images/marker/fitness_marker.png';
import fitnessSoccerMarkerImage from '../assets/images/marker/fitness_soccer_marker.png';
import fitnessSoccerBasketballMarkerImage from '../assets/images/marker/fitness_soccer_basketball_marker.png';
import soccerMarkerImage from '../assets/images/marker/soccer_marker.png';
import tableTennisMarker from '../assets/images/marker/tabletennis_marker.png';
import tableTennisBasketballMarkerImage from '../assets/images/marker/tabletennis_basketball_marker.png';
import tableTennisFitnessMarkerImage from '../assets/images/marker/tabletennis_fitness_marker.png';
import tableTennisSoccerMarkerImage from '../assets/images/marker/tabletennis_soccer_marker.png'
import tableTennisSoccerBasketballSMarkerImage from '../assets/images/marker/tabletennis_soccer_basketball_marker.png';
import tableTennisSoccerFitnessMarkerImage from '../assets/images/marker/tabletennis_soccer_fitness_marker.png';
import locationMarkerImage from '../assets/images/marker/location_marker.png';
import {SPORT_TYPE} from '../types/SportType';
import L from 'leaflet';

export interface IconImage {
    imageUrl: string,
    sportTypes: SPORT_TYPE[]
}

const allSportsIconImage: IconImage = {
    imageUrl: allSportsMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.FITNESS,
        SPORT_TYPE.SOCCER,
        SPORT_TYPE.TABLE_TENNIS,
    ]
}

const basketballIconImage: IconImage = {
    imageUrl: basketballMarkerImage,
    sportTypes: [SPORT_TYPE.BASKETBALL]
}

const basketballFitnessIconImage: IconImage = {
    imageUrl: basketballFitnessMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.FITNESS
    ]
}

const basketballSoccerIconImage: IconImage = {
    imageUrl: basketballSoccerMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.SOCCER
    ]
}
const fitnessIconImage: IconImage = {
    imageUrl: fitnessMarkerImage,
    sportTypes: [SPORT_TYPE.FITNESS]
}

const fitnessSoccerIconImage: IconImage = {
    imageUrl: fitnessSoccerMarkerImage,
    sportTypes: [
        SPORT_TYPE.FITNESS,
        SPORT_TYPE.SOCCER,
    ]
}
const fitnessSoccerBasketballIconImage: IconImage = {
    imageUrl: fitnessSoccerBasketballMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.FITNESS,
        SPORT_TYPE.SOCCER
    ]
}
const soccerIconImage: IconImage = {
    imageUrl: soccerMarkerImage,
    sportTypes: [SPORT_TYPE.SOCCER]
}
const tableTennisIconImage: IconImage = {
    imageUrl: tableTennisMarker,
    sportTypes: [SPORT_TYPE.TABLE_TENNIS]
}
const tableTennisBasketballIconImage: IconImage = {
    imageUrl: tableTennisBasketballMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.TABLE_TENNIS
    ]
}

const tableTennisFitnessIconImage: IconImage = {
    imageUrl: tableTennisFitnessMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.FITNESS
    ]
}

const tableTennisSoccerIconImage: IconImage = {
    imageUrl: tableTennisSoccerMarkerImage,
    sportTypes: [
        SPORT_TYPE.SOCCER,
        SPORT_TYPE.TABLE_TENNIS
    ]
}

const tableTennisSoccerBasketballIconImage: IconImage = {
    imageUrl: tableTennisSoccerBasketballSMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.SOCCER,
        SPORT_TYPE.TABLE_TENNIS
    ]
}

const tableTennisSoccerFitnessIconImage: IconImage = {
    imageUrl: tableTennisSoccerFitnessMarkerImage,
    sportTypes: [
        SPORT_TYPE.BASKETBALL,
        SPORT_TYPE.SOCCER,
        SPORT_TYPE.TABLE_TENNIS
    ]
}

export const MARKER_ICON_IMAGES: IconImage[] = [
    allSportsIconImage,
    basketballIconImage,
    basketballFitnessIconImage,
    basketballSoccerIconImage,
    fitnessIconImage,
    fitnessSoccerIconImage,
    fitnessSoccerBasketballIconImage,
    soccerIconImage,
    tableTennisIconImage,
    tableTennisBasketballIconImage,
    tableTennisFitnessIconImage,
    tableTennisSoccerIconImage,
    tableTennisSoccerBasketballIconImage,
    tableTennisSoccerFitnessIconImage
]

export const LocationMarker = L.icon({
    iconUrl: locationMarkerImage,
    iconSize: [24, 24]
});