import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { selectLoading, selectSelectedCast } from '../../redux/movie/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getCastsMovieOP, getCastsTVOP } from '../../redux/movie/operations';
import Loader from '../Loader/Loader';

export default function Cast() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLoading);
  const selectedCast = useSelector(selectSelectedCast);
  const { movieID, series_id } = useParams();
  const Params = useParams();

  useEffect(() => {
    if (Params.movieID) {
      dispatch(getCastsMovieOP(movieID!));
    }
    if (Params.series_id) {
      dispatch(getCastsTVOP(series_id!));
    }
  }, [movieID, series_id, dispatch]);
  const defaultSRC = `https://assets.mycast.io/actor_images/actor-an-unknown-actor-465215_large.jpg`;

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <ul className={css.cast__list}>
          {selectedCast && selectedCast.length > 0 ? (
            selectedCast.map(item => (
              <li key={item.id} className={css.cast__card}>
                <img
                  className={css.image}
                  src={
                    item.profile_path !== null && item.profile_path !== ''
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : defaultSRC
                  }
                  alt={item.name}
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                />

                <h2>{item.name}</h2>
                <p>Character: {item.character || 'Unknown'}</p>
                <p>Popularity: {item.popularity.toFixed(1)}</p>
              </li>
            ))
          ) : (
            <p className={css.no_casts}>{`There are no actors for this movie on our server.`}</p>
          )}
        </ul>
      )}
    </div>
  );
}
