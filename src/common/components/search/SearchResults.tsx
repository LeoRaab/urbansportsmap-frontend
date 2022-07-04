import React from 'react';
import {useDispatch} from 'react-redux';
import { changeMapCenter } from '../../../features/map/mapSlice';
import GeocodeWebEntity from '../../types/GeocodeWebEntity';
import { uiActions } from '../UI/uiSlice';

type SearchResultsProps = {
    searchResults?: GeocodeWebEntity[]
}

const SearchResults = ({searchResults}: SearchResultsProps) => {
    const dispatch = useDispatch();

    const handleSearchResultClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const latData = event.currentTarget.getAttribute('data-lat');
        const lngData = event.currentTarget.getAttribute('data-lng');

        if (latData !== null && lngData !== null) {
            try {
                const lat = parseFloat(latData);                
                const lng = parseFloat(lngData);
                dispatch(uiActions.hideSearchResults());
                dispatch(
                    changeMapCenter({lat, lng})
                );
            } catch(e) {
                console.log(e);
            }            
        } else {
            console.log('Lat, lng from SearchResult is null!');
        }
    }

    return (
        <div className="bg-white p-2 rounded-bl rounded-br shadow-sm">
            {searchResults &&
                searchResults.map((searchResult, key) =>
                    <div onClick={handleSearchResultClick}
                         key={key}
                         data-lat={searchResult.coordinates[1]}
                         data-lng={searchResult.coordinates[0]}
                         className="border-b border-slate-200 p-2">
                        {searchResult.address}
                    </div>
            )}
        </div>
    )
}

export default SearchResults;