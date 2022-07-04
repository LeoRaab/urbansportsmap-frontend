import React from 'react';
import { useNavigate } from 'react-router-dom';
import SportTypesList from '../../common/components/sportstypes-list/SportTypesList';
import FabButton from '../../common/components/form-elements/buttons/FabButton';
import ImageSwiper from '../../common/components/UI/ImageSwiper';
import VenueTitle from '../../common/components/UI/VenueTitle';
import { selectVenueById } from './venuesSlice';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../common/components/UI/uiSlice';
import Button from '../../common/components/form-elements/buttons/Button';
import IconButton from '../../common/components/form-elements/buttons/IconButton';

type TeaserProps = {
    venueId: string;
}

const Teaser = ({ venueId }: TeaserProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const venue = useSelector((state: RootState) => selectVenueById(state, venueId));

    const handleDetailClick = () => {
        dispatch(uiActions.hideAll());
        navigate('/detail/' + venueId);
    }

    return (
        <>
            <div className="h-full relative">
                    <div className="px-4 lg:px-8 lg:my-16">
                        <VenueTitle venue={venue} />

                        {venue &&
                            <div className="my-2">
                                <ImageSwiper venueId={venueId} />
                            </div>
                        }

                        <SportTypesList sportTypes={venue?.sportTypes} />

                        <div className="mt-2 lg:mt-4 w-full flex justify-end">
                            <div>
                                <FabButton backgroundColor="bg-green-200"
                                    onClick={handleDetailClick}>
                                    <ChevronRightIcon className="h-6 w-6"/>
                                </FabButton>
                            </div>
                        </div>
                    </div>
                
            </div>
        </>
    )
}

export default Teaser;