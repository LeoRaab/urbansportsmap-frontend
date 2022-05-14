import React from 'react';
import Chip from '../UI/Chip';
import DeleteButton from '../UI/buttons/DeleteButton';
import {useDispatch, useSelector} from 'react-redux';
import {filtersCleared, filterSelected, filterUnselected, selectFilters} from '../../store/filterSlice';
import {getSportTypeColor} from '../../util/get-sport-type-color';

const Filter = () => {

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    return (
        <>
            <div className="flex flex-wrap gap-x-2 gap-y-4 justify-start w-full">

                {filters.selectedFilters.length > 0 &&
                    filters.selectedFilters.map((filter, key) =>

                        <Chip key={key}
                              text={filter}
                              bgColor={getSportTypeColor(filter)}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterUnselected(key))}/>
                    )
                }

                {filters.unselectedFilters.length > 0 &&
                    filters.unselectedFilters.map((filter, key) =>

                        <Chip key={key}
                              text={filter}
                              bgColor={'bg-slate-200'}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterSelected(key))}/>
                    )
                }

                {filters.selectedFilters.length > 0 &&
                    <DeleteButton text={'Filter löschen'} handleOnClick={() => dispatch(filtersCleared())}/>
                }
            </div>
        </>
    )
}

export default Filter;