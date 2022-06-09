import React, { useEffect } from 'react';
import FabButton from '../UI/buttons/FabButton';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../SportTypesList/SportTypesList';
import Icon from '../UI/Icon';
import { ICONS } from '../../constants/Icons';
import VenueTitle from '../UI/VenueTitle';
import { useLazyGetVenueByIdQuery } from '../../store/api/venuesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ImageSwiper from '../UI/ImageSwiper';

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
    }, [venueId, trigger])

    return (
        <div className="h-full relative">
            {(isLoading || isFetching) &&
                <LoadingSpinner />
            }

            {isSuccess &&
                <>
                    <div className="flex flex-col justify-center px-4 lg:px-8">
                        <VenueTitle venue={venue} />
                    </div>

                    {venue &&
                        <div className="h-1/2 mt-4">
                            <ImageSwiper venueId={venueId} />
                        </div>
                    }

                    <div className="my-8 px-4 lg:px-8">
                        <SportTypesList sportTypes={venue?.sportTypes} />
                    </div>

                    <div className="fixed bottom-6 right-2 z-800">
                        <FabButton backgroundColor="bg-green-200"
                            onFabButtonClick={() => navigate('/detail/' + venue?.id)}>
                            <Icon icon={ICONS.INFO} />
                        </FabButton>
                    </div>
                </>
            }
        </div>
    )
}

export default Teaser;