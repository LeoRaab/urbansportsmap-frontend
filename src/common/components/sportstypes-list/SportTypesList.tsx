import Chip from '../UI/Chip';
import React from 'react';
import {SPORT_TYPE} from '../../types/SportType';
import {getSportTypeColor} from '../../util/get-sport-type-color';

type SportTypesProps = {
    sportTypes?: SPORT_TYPE[];
}

const SportTypesList = ({sportTypes}: SportTypesProps) => {

    const sportTypesListItems = sportTypes?.map((sportType, key) => {

        return <Chip key={key}
                     bgColor={getSportTypeColor(sportType)}
                     text={sportType}
                     fontColor={'text-white'}
                     isClickable={false}/>
    })

    return (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-start w-full">
            {sportTypesListItems}
        </div>
    )
}

export default SportTypesList;