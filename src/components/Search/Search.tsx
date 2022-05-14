import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {selectUi, uiActions} from '../../store/uiSlice';
import {useLazyGetGeocodeQuery} from '../../store/api/geocodeApi';

const Search = () => {
    const dispatch = useDispatch();
    const ui = useSelector(selectUi);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [ trigger, { data: foundGeocodes, isLoading, isFetching}] = useLazyGetGeocodeQuery();


    const handleSearchBarChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    useEffect(() => {
        if (searchTerm.length > 2) {
            trigger(searchTerm);
            dispatch(uiActions.searchResultsShown());
        } else {
            dispatch(uiActions.searchResultsHidden());
        }

    }, [dispatch, searchTerm, trigger])

    return (
        <>
            <div className="w-3/4">

                <SearchBar onSearchBarChange={handleSearchBarChange} isLoading={isLoading} isFetching={isFetching}/>
                {ui.isSearchResultsShowing && <SearchResults searchResults={foundGeocodes}/>}
            </div>
        </>
    )

}

export default Search;