import { Suspense, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';
import { isActive } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectSelectedMovie } from '../redux/movie/selectors';
import { getSelectedMovieByID } from '../redux/movie/operations';
import Loader from '../components/Loader/Loader';

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const selectedMovie = useSelector(selectSelectedMovie);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  const dispatch = useDispatch<any>();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getSelectedMovieByID(movieID!));
  }, [movieID, dispatch]);

  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>The resource you requested could not be found.</div>}
      <Link to={backLinkRef.current} className={css.btn}>
        Back to Home
      </Link>
      <Toaster />
      {selectedMovie && (
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
      )}

      {selectedMovie && (
        <>
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
          <Suspense fallback={<div>Loadingggggg</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
}
