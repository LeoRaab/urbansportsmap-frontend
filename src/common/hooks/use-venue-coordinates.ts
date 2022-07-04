import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeMapCenter } from "../../features/map/mapSlice";

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
                    throw Error('Coordinates from parameters, are not a number!');
                }
                
                dispatch(changeMapCenter({lat, lng}))
            } catch(e) {
                console.log(e);
            }
        }
    }, [dispatch, params.coordinates]);
}

export default useVenueCoordinates;