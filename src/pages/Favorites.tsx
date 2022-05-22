import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Filter from '../components/Filter/Filter';
import PageHeader from '../components/UI/PageHeader';
import FavoritesList from '../components/Favorites/FavoritesList';
import Modal from '../components/UI/Modal';
import GraphicMessage from '../components/UI/GraphicMessage';
import { ILLUSTRATIONS } from '../constants/Illustrations';
import { selectFilters } from '../store/filterSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useGetFavoritesQuery } from '../store/api/favoritesApi';
import Venue from '../types/Venue';
import { hasVenueSportType } from '../util/has-venue-sport-type';

const Favorites = () => {

    const { data: favoriteVenues, isLoading, isFetching } = useGetFavoritesQuery();
    const filters = useSelector(selectFilters);
    const [filteredVenues, setFilteredVenues] = useState<Venue[]>();

    console.log(favoriteVenues);

    useEffect(() => {
        if (favoriteVenues) {
            setFilteredVenues(favoriteVenues.filter(favoriteVenue => {
                if (filters.selectedFilters.length > 0) {
                    return hasVenueSportType(favoriteVenue, filters.selectedFilters);
                }

                return true;
            }));
        }
    }, [favoriteVenues, filters])

    return (
        <>
            {(isLoading && isFetching) &&
                <LoadingSpinner/>
            }

            <PageHeader text={'Favoriten'} />

            {(!isLoading && favoriteVenues && favoriteVenues.length === 0) &&
                <GraphicMessage illustration={ILLUSTRATIONS.NOT_FOUND}
                    title={'Keine Favoriten gefunden'}
                    text={'Du hast noch keine Favoriten gespeichert.'} />
            }

            {favoriteVenues && favoriteVenues.length > 0 &&
                <>
                    <div className="px-2 my-6">
                        <Filter />
                    </div>

                    <div className="flex flex-col gap-y-2 mt-4 px-2">
                        <FavoritesList favoriteVenues={filteredVenues} />
                    </div>
                </>
            }
        </>
    )
}

export default Favorites;