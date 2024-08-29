import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieByID } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';
import { IMovieByID, isActive } from '../types/types';
import { AxiosError } from 'axios';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedMovie, setSelectedMovie] = useState<IMovieByID | null>(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieByID(movieID || '');
        setSelectedMovie(data);
        // console.log(data);
        toast.success('Success');
      } catch (e: unknown) {
        setError(true);
        e instanceof AxiosError
          ? toast.error(e.response?.data?.status_message || e.message)
          : toast.error('An unkown error occured');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);

  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div>
      <Link to={backLinkRef.current} className={css.btn}>
        Back to Home
      </Link>
      <Toaster />
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
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
      <h2>Additional information</h2>
      {/* <h1>{selectedMovie?.budget}</h1> */}
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
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
