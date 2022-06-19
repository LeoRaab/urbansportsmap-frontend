import { useDispatch, useSelector } from "react-redux";
import Search from "../../common/components/search/Search";
import FabButton from "../../common/components/form-elements/buttons/FabButton";
import RangeSlider from "../../common/components/UI/RangeSlider";
import Filter from "../filter/Filter";
import MapOverlay from "./MapOverlay";
import { venueRadiusChanged } from "./mapSlice";
import Teaser from "./Teaser";
import { selectUi, uiActions } from "../../common/components/UI/uiSlice";
import { AdjustmentsIcon, LocationMarkerIcon } from "@heroicons/react/outline";

const MapUI = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    return (
        <div className="h-full">
            <div className="fixed top-6 flex justify-center w-full z-800">
                <Search />
            </div>

            <div className="fixed flex flex-col lg:flex bottom-24 lg:top-6 right-2 lg:right-1/4 z-800">
                <div className="">
                    <FabButton backgroundColor="bg-green-200"
                        onClick={() => dispatch(uiActions.filterShown())}>
                        <AdjustmentsIcon className="icon-size" />
                    </FabButton>
                </div>

                <div className="">
                        <FabButton backgroundColor="bg-amber-200"
                                onClick={() => console.log('alfs')}>
                            <LocationMarkerIcon className="icon-size" />
                        </FabButton>
                    </div>
            </div>

            <MapOverlay isShowing={ui.isFilterShowing}
                onCloseMapOverlay={() => dispatch(uiActions.filterHidden())}>
                <div className="my-4 p-4">
                    <Filter />
                    <RangeSlider onRangeChange={(rangeValue) => dispatch(venueRadiusChanged({venueRadius: rangeValue}))} />
                </div>
            </MapOverlay>

            <MapOverlay isShowing={ui.isTeaserShowing}
                onCloseMapOverlay={() => dispatch(uiActions.teaserHidden())}>
                <div className="my-4">
                    <Teaser venueId={ui.teaserVenueId} />
                </div>
            </MapOverlay>
        </div>
    )
}

export default MapUI;