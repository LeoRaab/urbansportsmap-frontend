import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeMapCenter } from '../../features/map/mapSlice';
import { STRINGS } from '../constants/strings';

const useVenueCoordinates = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.coordinates) {
      try {
        const [latString, lngString] = params.coordinates.split(',');

        const lat = parseFloat(latString);
        const lng = parseFloat(lngString);

        if (isNaN(lat) || isNaN(lng)) {
          throw Error(STRINGS.COORDINATES_ERROR);
        }

        dispatch(changeMapCenter({ lat, lng }));
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, params.coordinates]);
};

export default useVenueCoordinates;
