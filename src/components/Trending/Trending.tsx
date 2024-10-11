import { FC, MouseEvent, ReactNode, memo } from 'react';
import css from './Trending.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrendingOption } from '../../redux/movie/selectors';
import { setTrendingOption } from '../../redux/movie/slice';

interface TrendingProps {
  children?: ReactNode;
}

const Trending: FC<TrendingProps> = memo(({ children }) => {
  const dispatch = useDispatch();
  const trendingOption = useSelector(selectTrendingOption);

  const makeLinkClass = (buttonType: 'day' | 'week') => {
    return clsx(css.trending__item, trendingOption === buttonType ? css.active : '');
  };

  const HandleClick = (evt: MouseEvent<HTMLButtonElement>, buttonType: 'day' | 'week') => {
    dispatch(setTrendingOption(buttonType));
  };

  return (
    <div className={css.trending}>
      <div className={css.trending__box}>
        <h2 className={css.trending__header}>Trending</h2>
        <ul className={css.trending__list}>
          <li>
            <button className={makeLinkClass('day')} onClick={evt => HandleClick(evt, 'day')}>
              <span className={css.trending__text}>Today</span>
            </button>
          </li>
          <li>
            <button className={makeLinkClass('week')} onClick={evt => HandleClick(evt, 'week')}>
              <span className={css.trending__text}>Week</span>
            </button>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
});

export default Trending;
