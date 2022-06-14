import Venue from '../../common/types/Venue';
import FavoriteItem from './FavoriteItem';

type FavoritesListProps = {
    favoriteVenues?: Venue[]
}

const FavoritesList = ({favoriteVenues}: FavoritesListProps) => {

    const favoritesListItems = favoriteVenues?.map((favoriteVenue, key) =>
        <FavoriteItem key={key}
                      venue={favoriteVenue}/>
    );

    return (
        <>
            {favoritesListItems}
        </>
    )
}

export default FavoritesList;