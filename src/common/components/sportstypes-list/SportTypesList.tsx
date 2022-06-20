import React from 'react';
import Chip from '../UI/Chip';
import {SPORT_TYPE} from '../../types/SportType';
import {getSportTypeColor} from '../../util/get-sport-type-color';

type SportTypesProps = {
    sportTypes?: SPORT_TYPE[];
}

const SportTypesList = ({sportTypes}: SportTypesProps) => {

    const sportTypesListItems = sportTypes?.map((sportType, key) => {

        return <div className="mt-2" key={key}>
                    <Chip
                        bgColor={getSportTypeColor(sportType)}
                        text={sportType}
                        fontColor={'text-white'}
                        isClickable={false}/>
                </div>
    })

    return (
        <div className="flex flex-wrap">
            {sportTypesListItems}
        </div>
    )
}

export default SportTypesList;