import { useDispatch, useSelector } from "react-redux";
import Search from "../../common/components/search/Search";
import FabButton from "../../common/components/form-elements/buttons/FabButton";
import RangeSlider from "../../common/components/UI/RangeSlider";
import Filter from "../filter/Filter";
import MapOverlay from "./MapOverlay";
import { changeVenueRadius } from "./mapSlice";
import Teaser from "./Teaser";
import { selectUi, uiActions } from "../../common/components/UI/uiSlice";
import { AdjustmentsIcon } from "@heroicons/react/outline";

const MapUI = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    return (
        <div className="h-full">
            <div className="fixed top-6 flex justify-center w-full z-800">
                <Search />
            </div>

            <div className="fixed bottom-24 right-2 z-800">
                <FabButton backgroundColor="bg-green-200"
                        onClick={() => dispatch(uiActions.showFilter())}>
                        <AdjustmentsIcon className="icon-size" />
                </FabButton>
            </div>

            <MapOverlay isShowing={ui.isFilterShowing}
                onCloseMapOverlay={() => dispatch(uiActions.hideFilter())}>
                <div className="my-4 p-4">
                    <Filter />
                    <RangeSlider onRangeChange={(rangeValue) => dispatch(changeVenueRadius({venueRadius: rangeValue}))} />
                </div>
            </MapOverlay>

            <MapOverlay isShowing={ui.isTeaserShowing}
                onCloseMapOverlay={() => dispatch(uiActions.hideTeaser())}>
                <Teaser venueId={ui.teaserVenueId} />
            </MapOverlay>
        </div>
    )
}

export default MapUI;