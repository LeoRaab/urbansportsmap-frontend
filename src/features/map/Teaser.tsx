import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import FabButton from '../../common/components/UI/buttons/FabButton';
import Icon from '../../common/components/UI/Icon';
import ImageSwiper from '../../common/components/UI/ImageSwiper';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import VenueTitle from '../../common/components/UI/VenueTitle';
import { ICONS } from '../../common/constants/Icons';
import { useLazyGetVenueByIdQuery } from './venuesApi';

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