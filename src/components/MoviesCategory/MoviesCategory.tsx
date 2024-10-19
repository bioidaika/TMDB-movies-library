import { FC, memo, MouseEvent, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from '../Trending/Trending.module.css';
import clsx from 'clsx';
import { selectMovieParam } from '../../redux/movie/selectors';
import { setMovieParam, setPage } from '../../redux/movie/slice';

interface MoviesProps {
  children?: ReactNode;
}

export const MoviesCategory: FC<MoviesProps> = memo(({ children }) => {
  const dispatch = useDispatch();
  const movieParams = useSelector(selectMovieParam);
  const makeLinkClass = (buttonType: 'now_playing' | 'popular' | 'top_rated' | 'upcoming') => {
    return clsx(css.trending__item, movieParams === buttonType ? css.active : '');
  };
  const HandleClick = (
    evt: MouseEvent<HTMLButtonElement>,
    buttonType: 'now_playing' | 'popular' | 'top_rated' | 'upcoming'
  ) => {
    dispatch(setMovieParam(buttonType));
    dispatch(setPage(1));
  };

  return (
    <div className={css.trending}>
      <div className={css.trending__box}>
        <h2 className={css.trending__header}>Category</h2>
        <ul className={css.trending__list}>
          <li>
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
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
});
