import { useDispatch, useSelector } from 'react-redux';
import { selectFavorite } from '../../redux/auth/selectors';
import css from './FavoriteButton.module.css';
import { addFavorite } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { selectSelectedMovie, selectSelectedTV } from '../../redux/movie/selectors';
import { IfavoriteItem } from '../../types/types';

interface FavoriteButtonProps {
  movieId: number;
  mediaType: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, mediaType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const FavoriteList = useSelector(selectFavorite);
  //   const location = useLocation();
  //   const path = location.pathname.split('/')[1];
  //   console.log('path', path);
  const pickedMovie = useSelector(selectSelectedMovie);
  const pickedTV = useSelector(selectSelectedTV);

  let dataMovie: IfavoriteItem;
  if (mediaType === 'movie' && pickedMovie) {
    dataMovie = {
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
      contentType: mediaType,
    };
  } else if (mediaType === 'tv' && pickedTV) {
    dataMovie = {
      backdrop_path: pickedTV.backdrop_path,
      genres: pickedTV.genres.map(item => item.id),
      media_id: pickedTV.id,
      original_title: pickedTV.original_name,
      overview: pickedTV.overview,
      poster_path: pickedTV.poster_path,
      release_date: pickedTV.first_air_date,
      title: pickedTV.name,
      vote_average: pickedTV.vote_average,
      vote_count: pickedTV.vote_count,
      contentType: mediaType,
    };
  }
  //   pickedMedia =
  //     mediaType === 'movie' ? useSelector(selectSelectedMovie) : useSelector(selectSelectedTV);
  //   if (!pickedMedia) return null;

  //   const dataTV = {
  //     backdrop_path: pickedMedia.backdrop_path,
  //     genres: pickedMedia.genres.map(item => item.id),
  //     media_id: pickedMedia.id,
  //     original_title: pickedMedia.original_name,
  //     overview: pickedMedia.overview,
  //     poster_path: pickedMedia.poster_path,
  //     release_date: pickedMedia.first_air_date,
  //     title: pickedMedia.name,
  //     vote_average: pickedMedia.vote_average,
  //     vote_count: pickedMedia.vote_count,
  //     contentType: mediaType,
  //   };
  console.log('Component FavoriteButton');

  if (!FavoriteList) return null;
  //  console.log('Component FavoriteButton2');
  const isFavorite = FavoriteList.some(item => item.media_id === movieId);
  console.log('is Favorite', isFavorite); // false

  const handleClick = () => {
    // if (isFavorite) dispatch(removeFavorite(movieId));
    // else dispatch(addFavorite(movieId));
    if (!isFavorite) dispatch(addFavorite(dataMovie));
  };
  console.log('Component FavoriteButton3');
  return (
    <button className={isFavorite ? css.favorite : css.notFavorite} onClick={handleClick}>
      {isFavorite ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
    </button>
  );
};
