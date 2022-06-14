import React, {useState} from 'react';
import InlineLoadingSpinner from '../UI/InlineLoadingSpinner';

type SearchBarProps = {
    onSearchBarChange: (searchTerm: string) => void;
    isLoading?: boolean,
    isFetching?: boolean
}

const SearchBar = ({onSearchBarChange, isLoading, isFetching}: SearchBarProps) => {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchBarChange(event.target.value);
        setSearchTerm(event.target.value);
    }

    const handleClearSearchBar = () => {
        onSearchBarChange('');
        setSearchTerm('');
    }

    return (
        <form className="group relative">

            {(!isLoading && !isFetching) &&
                <svg width="20" height="20" fill="currentColor"
                     className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-slate-400"
                     aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                </svg>
            }

            {(isLoading || isFetching) &&
                <div className="absolute left-3 top-5">
                    <InlineLoadingSpinner/>
                </div>
            }

            {searchTerm.length > 0 &&
                <svg
                    className="h-5 w-5 absolute right-3 top-1/2 -mt-2.5 text-slate-400 group-focus-within:text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={handleClearSearchBar}>
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                </svg>
            }

            <input
                onChange={handleChange}
                className="focus:ring-2 focus:text-black focus:ring-slate-400 focus:outline-none appearance-none w-full leading-6 placeholder-slate-400 text-slate-400 bg-white/95 rounded py-4 pl-10 ring-1 ring-slate-200 shadow-sm"
                type="text" aria-label="Filter projects" placeholder="Suche nach Straßen, Pl&auml;tzen ..."
                value={searchTerm}/>
        </form>
    )
}

export default SearchBar;