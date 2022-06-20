import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import ImageSwiper from '../../common/components/UI/ImageSwiper';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import VenueTitle from '../../common/components/UI/VenueTitle';
import { useLazyGetVenueByIdQuery } from './mapSlice';
import { ChevronRightIcon } from '@heroicons/react/outline';

type TeaserProps = {
    venueId: string;
}

const Teaser = ({ venueId }: TeaserProps) => {
    const navigate = useNavigate();
    const [trigger, {
        data: venue, isLoading, isFetching, isSuccess
    }] = useLazyGetVenueByIdQuery();

    useEffect(() => {
        if (venueId && venueId !== '') {
            trigger(venueId);
        }
    }, [venueId, trigger]);

    const handleDetailClick = () => {
        navigate('/detail/' + venueId);
    }

    return (
        <div className="h-full relative">
            {(isLoading || isFetching) &&
                <LoadingSpinner />
            }

            {isSuccess &&
                <div className="px-4 lg:px-8">
                    <VenueTitle venue={venue} />


                    {venue &&
                        <div className="my-2">
                            <ImageSwiper venueId={venueId} />
                        </div>
                    }

                    <SportTypesList sportTypes={venue?.sportTypes} />

                    <div className="fixed bottom-6 right-2 z-800">
                        <FabButton backgroundColor="bg-green-200"
                            onClick={handleDetailClick}>
                            <ChevronRightIcon className="h-6 w-6"/>
                        </FabButton>
                    </div>
                </div>
            }
        </div>
    )
}

export default Teaser;