import React, {useEffect} from 'react';
import FabButton from '../UI/buttons/FabButton';
import {useNavigate} from 'react-router-dom';
import SportTypesList from '../SportTypesList/SportTypesList';
import Icon from '../UI/Icon';
import {ICONS} from '../../constants/Icons';
import VenueTitle from '../UI/VenueTitle';
import {useLazyGetVenueByIdQuery} from '../../store/api/venuesApi';
import LoadingSpinner from '../UI/LoadingSpinner';

type TeaserProps = {
    venueId: string;
}

const Teaser = ({venueId}: TeaserProps) => {
    const navigate = useNavigate();
    const [trigger, {
        data: venue, isLoading, isFetching, isSuccess
    }] = useLazyGetVenueByIdQuery();

    //const venueImages = useVenueImages(venue?.id);


    /*
        gehört unter VenueTitle:
        {venueImages.images &&
                <div className="h-1/2 mt-4">
                    <ImageSwiper images={venueImages.images}/>
                </div>
            }
     */

    useEffect(() => {
        if (venueId && venueId !== '') {
            trigger(venueId);
        }
    }, [venueId, trigger])

    return (
        <div className="h-full relative">
            {(isLoading || isFetching) &&
                <LoadingSpinner/>
            }

            {isSuccess &&
                <>
                    <div className="flex items-center">
                        <VenueTitle venue={venue}/>
                    </div>

                    <div className="my-8 px-2">
                        <SportTypesList sportTypes={venue?.sportTypes}/>
                    </div>

                    <div className="fixed bottom-6 right-2 z-800">
                        <FabButton backgroundColor="bg-green-200"
                                   onFabButtonClick={() => navigate('/detail/' + venue?.id)}>
                            <Icon icon={ICONS.INFO}/>
                        </FabButton>
                    </div>
                </>
            }
        </div>
    )
}

export default Teaser;