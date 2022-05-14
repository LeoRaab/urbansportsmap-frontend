import FavoriteItem from './FavoriteItem';
import Venue from '../../types/Venue';

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