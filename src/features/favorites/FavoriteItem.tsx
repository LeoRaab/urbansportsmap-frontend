import React from 'react';
import SportTypesList from '../SportTypesList/SportTypesList';
import Card from '../UI/Card';
import Icon from '../UI/Icon';
import {useNavigate} from 'react-router-dom';
import {ICONS} from '../../constants/Icons';
import Venue from '../../types/Venue';

type FavoriteItemProps = {
    venue?: Venue;
}

const FavoriteItem = ({venue}: FavoriteItemProps) => {

    const navigate = useNavigate();

    return (
        <div className="w-full">
            <Card>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-xl">{venue?.name}</p>
                        <div className="flex mt-4">
                            <SportTypesList sportTypes={venue?.sportTypes}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button className="shadow-md rounded mb-2 p-2 bg-slate-100"
                                onClick={() => navigate('/' + venue?.location.lat + ',' + venue?.location.lng)}>
                            <Icon icon={ICONS.MAP}/>
                        </button>
                        <button className="shadow-md rounded mt-2 p-2 bg-slate-100"
                                onClick={() => navigate('/detail/' + venue?.id)}>
                            <Icon icon={ICONS.INFO}/>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FavoriteItem;