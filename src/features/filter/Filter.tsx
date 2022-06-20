import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/components/form-elements/buttons/Button';
import Chip from '../../common/components/UI/Chip';
import { getSportTypeColor } from '../../common/util/get-sport-type-color';
import { selectFilters, filterUnselected, filterSelected, filtersCleared } from './filterSlice';

const Filter = () => {

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    return (
        <>
            <div className="flex flex-wrap gap-y-2 items-center">

                {filters.selectedFilters.length > 0 &&
                    filters.selectedFilters.map((filter, key) =>                           
                            <Chip key={key}
                              text={filter}
                              bgColor={getSportTypeColor(filter)}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterUnselected({index: key}))}/>
                    )
                }

                {filters.unselectedFilters.length > 0 &&
                    filters.unselectedFilters.map((filter, key) =>    
                            <Chip key={key}
                              text={filter}
                              bgColor={'bg-slate-200'}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterSelected({index: key}))}/>
                    )
                }

                {filters.selectedFilters.length > 0 &&
                    <div>
                        <Button color="transparent" type="button" onClick={() => dispatch(filtersCleared())}>
                            Filter löschen
                        </Button>
                    </div>
                }
            </div>
        </>
    )
}

export default Filter;