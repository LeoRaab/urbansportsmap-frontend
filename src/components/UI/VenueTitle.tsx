import React, {useEffect, useState} from 'react';
import Venue from '../../types/Venue';
import InlineLoadingSpinner from './InlineLoadingSpinner';
import {useLazyGetReverseGeocodeQuery} from '../../store/api/geocodeApi';

type VenueTitleProps = {
    venue?: Venue
}

const VenueTitle = ({venue}: VenueTitleProps) => {

    const [address, setAddress] = useState<string>();

    const [trigger, {data: foundGeocode, isLoading, isFetching, isSuccess}] = useLazyGetReverseGeocodeQuery();

    useEffect(() => {
        if (venue?.location) {
            const stringCoordinates = venue.location.lng + ',' + venue.location.lat;
            trigger(stringCoordinates);
        }
    }, [venue, trigger]);


    useEffect(() => {
        if (foundGeocode) {
            setAddress(foundGeocode.address)
        }
    }, [foundGeocode])


    return (
        <div className="px-2">
            <h2 className="text-2xl">{venue?.name}</h2>
            <div className="mt-1">
                {(isLoading || isFetching) &&
                    <InlineLoadingSpinner/>
                }
                {(isSuccess && !isLoading && !isFetching) &&
                    <p>
                        {address}
                    </p>
                }
            </div>
        </div>
    )

}

export default VenueTitle;