import { FC, memo, MouseEvent, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from '../Trending/Trending.module.css';
import clsx from 'clsx';
import { selectMovieParam } from '../../redux/movie/selectors';
import { setMovieParam, setPage } from '../../redux/movie/slice';
import { useSearchParams } from 'react-router-dom';

interface MoviesProps {
  children?: ReactNode;
  queryParams?: string[];
}

export const Category: FC<MoviesProps> = memo(({ children, queryParams }) => {
  const dispatch = useDispatch();
  const movieParams = useSelector(selectMovieParam);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useSearchParams();

  //function for array in queryParams
  const formatQueryParam = (param: string) => {
    return param.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const makeLinkClass = (buttonType: string) => {
    return clsx(css.trending__item, movieParams === buttonType ? css.active : '');
  };

  const HandleClick = (evt: MouseEvent<HTMLButtonElement>, buttonType: string) => {
    dispatch(setMovieParam(buttonType));
    dispatch(setPage(1));
    setParams({ section: buttonType });
  };

  return (
    <div className={css.trending}>
      <div className={css.trending__box}>
        <h2 className={css.trending__header}>Category</h2>
        <ul className={css.trending__list}>
          {/* // code start */}
          {queryParams?.map((item, index) => {
            return (
              <li key={index}>
                <button className={makeLinkClass(item)} onClick={evt => HandleClick(evt, item)}>
                  <span className={css.trending__text}>{formatQueryParam(item)}</span>
                </button>
              </li>
            );
          })}
          {/* //code end */}
          {/* <li>
            <button
              className={makeLinkClass('now_playing')}
              onClick={evt => HandleClick(evt, 'now_playing')}
            >
              <span className={css.trending__text}>Now playing</span>
            </button>
          </li>
          <li>
            <button
              className={makeLinkClass('popular')}
              onClick={evt => HandleClick(evt, 'popular')}
            >
              <span className={css.trending__text}>Popular</span>
            </button>
          </li>
          <li>
            <button
              className={makeLinkClass('top_rated')}
              onClick={evt => HandleClick(evt, 'top_rated')}
            >
              <span className={css.trending__text}>Top Rated</span>
            </button>
          </li>
          <li>
            <button
              className={makeLinkClass('upcoming')}
              onClick={evt => HandleClick(evt, 'upcoming')}
            >
              <span className={css.trending__text}>Upcoming</span>
            </button>
          </li> */}
        </ul>
      </div>
      {children}
    </div>
  );
});
