import { useSelector } from 'react-redux';
import { selectSelectedTV } from '../../redux/movie/selectors';
import css from './TvDetails.module.css';
import { Suspense, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isActive } from '../../types/types';
import clsx from 'clsx';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import Title from '../Title/Title';

const TvDetails = () => {
  const selectedTV = useSelector(selectSelectedTV);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/tv');
  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <>
      {selectedTV && (
        <div className={css.section}>
          <Link to={backLinkRef.current} className={css.btn}>
            Back to Home
          </Link>
          <div className={css.container}>
            <div className={css.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${selectedTV.poster_path}`}
                alt={selectedTV.original_name}
              />
              <FavoriteButton movieId={selectedTV.id} mediaType={'tv'} />
            </div>
            <div className={css.description}>
              <Title text={selectedTV.original_name} size="45px" />
              <p>{`Vote Average: ${selectedTV.vote_average.toFixed(1)}/10 (${
                selectedTV.vote_count
              })`}</p>
              {Number(selectedTV.vote_average.toFixed(1)) > 1 ? (
                <span
                  className={css.rating}
                  style={
                    {
                      background: `linear-gradient(90deg, gold ${Math.round(
                        selectedTV.vote_average * 10
                      )}%, gray ${Math.round(selectedTV.vote_average * 10)}%) text`,
                      color: 'transparent',
                    } as React.CSSProperties
                  }
                >
                  {'★★★★★★★★★★'}
                </span>
              ) : (
                <span
                  className={css.rating}
                  style={
                    {
                      color: 'gray',
                    } as React.CSSProperties
                  }
                >
                  {'★★★★★★★★★★'}
                </span>
              )}
              <Title text={`Overview`} />
              <p>{selectedTV.overview}</p>
              <Title text={`Genres`} />
              <ul className={css.list}>
                {selectedTV.genres.map(item => (
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
          <Suspense fallback={'Loading...'}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default TvDetails;
