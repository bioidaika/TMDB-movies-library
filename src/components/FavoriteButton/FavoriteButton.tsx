import { useDispatch, useSelector } from 'react-redux';
import { selectFavorite } from '../../redux/auth/selectors';
import css from './FavoriteButton.module.css';
// import { AppDispatch } from '../../redux/store';
// import { addFavorite, removeFavorite } from '../../redux/auth/operations';

interface FavoriteButtonProps {
  movieId: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const FavoriteList = useSelector(selectFavorite);
  if (!FavoriteList) return null;
  const isFavorite = FavoriteList.some(item => item.id === movieId);
  const handleClick = () => {
    // if (isFavorite) dispatch(removeFavorite(movieId));
    // else dispatch(addFavorite(movieId));
  };

  return (
    <button className={isFavorite ? css.favorite : css.notFavorite} onClick={handleClick}>
      Add to favorites
    </button>
  );
};
