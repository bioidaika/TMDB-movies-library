import { useSelector } from 'react-redux';
import { selectSelectedMovie } from '../../redux/movie/selectors';
import css from './MovieDetails.module.css';
import { Suspense, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isActive } from '../../types/types';
import clsx from 'clsx';
import Title from '../Title/Title';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

const MovieDetails = () => {
  const selectedMovie = useSelector(selectSelectedMovie);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <>
      {selectedMovie && (
        <div className={css.section}>
          <Link to={backLinkRef.current} className={css.btn}>
            Back to Home
          </Link>
          <div className={css.container}>
            <div className={css.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                alt={selectedMovie.original_title}
              />
              <FavoriteButton movieId={selectedMovie.id} mediaType={'movie'} />
            </div>
            <div className={css.description}>
              <Title text={selectedMovie.original_title} size="45px" />
              <p>{`Vote Average: ${selectedMovie.vote_average.toFixed(1)}`}</p>
              <Title text={`Overview`} />
              <p>{selectedMovie.overview}</p>
              <Title text={`Genres`} />
              <ul className={css.list}>
                {selectedMovie.genres.map(item => (
                  <li className={css.list__item} key={item.id}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Title text={`Additional information`} />
          <ul className={css.add_info_list}>
            <li className={css.add_info_item}>
              <NavLink to="cast" className={makeLinkClass}>
                Cast
              </NavLink>
            </li>
            <li className={css.add_info_item}>
              <NavLink to="reviews" className={makeLinkClass}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={''}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
