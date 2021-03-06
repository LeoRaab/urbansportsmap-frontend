import React, { useEffect, useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetGeocodeQuery } from '../../../features/map/geocodeApi';
import { selectUi, uiActions } from '../UI/uiSlice';

const Search = () => {
  const dispatch = useDispatch();
  const ui = useSelector(selectUi);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [search, { data: foundGeocodes, isLoading, isFetching }] = useLazyGetGeocodeQuery();

  const handleSearchBarChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      search(searchTerm);
      dispatch(uiActions.showSearchResults());
    } else {
      dispatch(uiActions.hideSearchResults());
    }
  }, [dispatch, searchTerm, search]);

  return (
    <>
      <div className="w-3/4 lg:w-2/5">
        <SearchBar onSearchBarChange={handleSearchBarChange} isLoading={isLoading} isFetching={isFetching} />
        {ui.isSearchResultsShowing && <SearchResults searchResults={foundGeocodes} />}
      </div>
    </>
  );
};

export default Search;
