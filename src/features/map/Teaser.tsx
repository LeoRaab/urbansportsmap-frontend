import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import ImageSwiper from '../../common/components/UI/ImageSwiper';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import VenueTitle from '../../common/components/UI/VenueTitle';
import { useLazyGetVenueByIdQuery } from './venuesApi';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../common/components/UI/uiSlice';

type TeaserProps = {
    venueId: string;
}

const Teaser = ({ venueId }: TeaserProps) => {
    const dispatch = useDispatch();
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
        dispatch(uiActions.allHidden);
    }

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
                            onClick={handleDetailClick}>
                            <ChevronRightIcon className="h-6 w-6"/>
                        </FabButton>
                    </div>
                </>
            }
        </div>
    )
}

export default Teaser;