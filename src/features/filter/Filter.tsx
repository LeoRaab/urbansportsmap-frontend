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
            <div className="flex flex-wrap items-center">

                {filters.selectedFilters.length > 0 &&
                    filters.selectedFilters.map((filter, key) =>
                        <div className="mb-2 mr-2" key={key}>                            
                            <Chip
                              text={filter}
                              bgColor={getSportTypeColor(filter)}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterUnselected({index: key}))}/>
                        </div>
                    )
                }

                {filters.unselectedFilters.length > 0 &&
                    filters.unselectedFilters.map((filter, key) =>
                        <div className="mb-2 mr-2" key={key}>    
                            <Chip key={key}
                              text={filter}
                              bgColor={'bg-slate-200'}
                              isClickable={true}
                              id={key}
                              onChipClick={() => dispatch(filterSelected({index: key}))}/>
                        </div>
                    )
                }

                {filters.selectedFilters.length > 0 &&
                    <div className="mb-2 mr-2">
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