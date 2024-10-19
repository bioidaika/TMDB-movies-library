import { useSelector } from 'react-redux';
import { selectSelectedMovie } from '../../redux/movie/selectors';
import css from './MovieDetails.module.css';
import { Suspense, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isActive } from '../../types/types';
import clsx from 'clsx';

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
        <div>
          <Link to={backLinkRef.current} className={css.btn}>
            Back to Home
          </Link>
          <div className={css.container}>
            <img
              src={`https://image.tmdb.org/t/p/w400/${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
            <div className={css.description}>
              <h1>{selectedMovie.original_title}</h1>
              <p>{`Vote Average: ${selectedMovie.vote_average.toFixed(1)}`}</p>
              <h2>Overview</h2>
              <p>{selectedMovie.overview}</p>
              <h2>Genres</h2>
              <ul className={css.list}>
                {selectedMovie.genres.map(item => (
                  <li className={css.list__item} key={item.id}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2>Additional information</h2>
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
