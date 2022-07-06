import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GraphicMessage from '../../common/components/UI/GraphicMessage';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { ILLUSTRATIONS } from '../../common/constants/illustrations';
import { STRINGS } from '../../common/constants/strings';
import Venue from '../../common/types/Venue';
import { hasVenueSportType } from '../../common/util/has-venue-sport-type';
import Filter from '../filter/Filter';
import { selectFilters } from '../filter/filterSlice';
import { useGetFavoritesQuery } from './favoritesApi';
import FavoritesList from './FavoritesList';

const Favorites = () => {
  const { data: favoriteVenues, isLoading, isFetching } = useGetFavoritesQuery();
  const filters = useSelector(selectFilters);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>();

  useEffect(() => {
    if (favoriteVenues) {
      setFilteredVenues(
        favoriteVenues.filter((favoriteVenue) => {
          if (filters.selectedFilters.length > 0) {
            return hasVenueSportType(favoriteVenue, filters.selectedFilters);
          }

          return true;
        }),
      );
    }
  }, [favoriteVenues, filters]);

  return (
    <PageWrapper title={STRINGS.PAGE_FAVORITES}>
      {favoriteVenues && favoriteVenues.length > 0 && (
        <>
          <div className="my-6">
            <Filter />
          </div>

          <div className="flex flex-col gap-y-2 mt-4">
            <FavoritesList favoriteVenues={filteredVenues} />
          </div>
        </>
      )}

      {isLoading && isFetching && <LoadingSpinner />}

      {!isLoading && favoriteVenues && favoriteVenues.length === 0 && (
        <GraphicMessage
          illustration={ILLUSTRATIONS.NOT_FOUND}
          title={'Keine Favoriten gefunden'}
          text={'Du hast noch keine Favoriten gespeichert.'}
        />
      )}
    </PageWrapper>
  );
};

export default Favorites;
