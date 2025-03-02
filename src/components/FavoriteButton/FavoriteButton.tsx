import { useDispatch, useSelector } from 'react-redux';
import { selectFavorite } from '../../redux/auth/selectors';
import css from './FavoriteButton.module.css';
import { addFavorite } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { selectSelectedMovie } from '../../redux/movie/selectors';

interface FavoriteButtonProps {
  movieId: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const FavoriteList = useSelector(selectFavorite);
  const pickedMovie = useSelector(selectSelectedMovie);
  if (!pickedMovie) return null;

  const data = {
    backdrop_path: pickedMovie.backdrop_path,
    genres: pickedMovie.genres.map(item => item.id),
    media_id: pickedMovie.id,
    original_title: pickedMovie.original_title,
    overview: pickedMovie.overview,
    poster_path: pickedMovie.poster_path,
    release_date: pickedMovie.release_date,
    title: pickedMovie.title,
    vote_average: pickedMovie.vote_average,
    vote_count: pickedMovie.vote_count,
    contentType: 'movie',
  };
  console.log('Component FavoriteButton');

  if (!FavoriteList) return null;
  //  console.log('Component FavoriteButton2');
  const isFavorite = FavoriteList.some(item => item.media_id === movieId);
  console.log('is Favorite', isFavorite); // false

  const handleClick = () => {
    // if (isFavorite) dispatch(removeFavorite(movieId));
    // else dispatch(addFavorite(movieId));
    if (!isFavorite) dispatch(addFavorite(data));
  };
  console.log('Component FavoriteButton3');
  return (
    <button className={isFavorite ? css.favorite : css.notFavorite} onClick={handleClick}>
      {isFavorite ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
    </button>
  );
};
