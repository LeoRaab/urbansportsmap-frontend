import React from 'react';
import {GeocodeWebEntity} from '../../types/WebEntities';
import {useDispatch} from 'react-redux';
import {mapCenterChanged} from '../../store/mapSlice';
import {uiActions} from '../../store/uiSlice';

type SearchResultsProps = {
    searchResults?: GeocodeWebEntity[]
}

const SearchResults = ({searchResults}: SearchResultsProps) => {
    const dispatch = useDispatch();

    const handleSearchResultClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const latData = event.currentTarget.getAttribute('data-lat');
        const lngData = event.currentTarget.getAttribute('data-lng');

        if (latData !== null && lngData !== null) {
            const lat = parseFloat(latData);
            const lng = parseFloat(lngData);

            dispatch(uiActions.searchResultsHidden());
            dispatch(
                mapCenterChanged({
                    lat,
                    lng
                })
            );
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