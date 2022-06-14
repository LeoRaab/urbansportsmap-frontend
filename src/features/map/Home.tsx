import { useDispatch, useSelector } from "react-redux";
import Search from "../../common/components/search/Search";
import FabButton from "../../common/components/UI/buttons/FabButton";
import Icon from "../../common/components/UI/Icon";
import RangeSlider from "../../common/components/UI/RangeSlider";
import { ICONS } from "../../common/constants/Icons";
import Filter from "../filter/Filter";
import MapOverlay from "./MapOverlay";
import { venueRadiusChanged } from "./mapSlice";
import Teaser from "./Teaser";
import { selectUi, uiActions } from "./uiSlice";

const Home = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    return (
        <div className="w-2/5 h-full">
            <div className="fixed top-5 flex justify-center w-full z-800">
                <Search />
            </div>

            <div className="fixed bottom-24 lg:top-1/2 right-2 z-800">
                <FabButton backgroundColor="bg-green-200"
                    onFabButtonClick={() => dispatch(uiActions.filterShown())}>
                    <Icon icon={ICONS.FILTER} />
                </FabButton>
            </div>

            <MapOverlay isShowing={ui.isFilterShowing}
                onCloseMapOverlay={() => dispatch(uiActions.filterHidden())}>
                <div className="my-4 p-4">
                    <Filter />
                    <RangeSlider onRangeChange={(rangeValue) => dispatch(venueRadiusChanged(rangeValue))} />
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

export default Home;