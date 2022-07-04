import React from 'react';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import Card from '../../common/components/UI/Card';
import Venue from '../../common/types/Venue';
import { MapIcon, ChevronRightIcon } from "@heroicons/react/outline";

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
                                onClick={() => navigate('/venue/' + venue?.location.lat + ',' + venue?.location.lng)}>
                            <MapIcon className="icon-size" />
                        </button>
                        <button className="shadow-md rounded mt-2 p-2 bg-slate-100"
                                onClick={() => navigate('/detail/' + venue?.id)}>
                            <ChevronRightIcon className="icon-size" />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FavoriteItem;