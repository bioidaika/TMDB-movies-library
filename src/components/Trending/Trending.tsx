import { FC, MouseEvent, ReactNode, useState } from 'react';
import css from './Trending.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrendingOption } from '../../redux/movie/selectors';
import { setTrendingOption } from '../../redux/movie/slice';

interface TrendingProps {
  children?: ReactNode;
}

export const Trending: FC<TrendingProps> = ({ children }) => {
  const dispatch = useDispatch();
  const trendingOption = useSelector(selectTrendingOption);

  const makeLinkClass = (buttonType: 'day' | 'week') => {
    return clsx(css.trending__item, trendingOption === buttonType ? css.active : '');
  };

  const HandleClick = (evt: MouseEvent<HTMLButtonElement>, buttonType: 'day' | 'week') => {
    dispatch(setTrendingOption(buttonType));
    // console.log(buttonType);
  };

  return (
    <div className={css.trending}>
      <div className={css.trending__box}>
        <h2 className={css.trending__header}>Trending</h2>
        <div className={css.trending__list}>
          <button className={makeLinkClass('day')} onClick={evt => HandleClick(evt, 'day')}>
            <span className={css.trending__text}>Today</span>
          </button>
          <button className={makeLinkClass('week')} onClick={evt => HandleClick(evt, 'week')}>
            <span className={css.trending__text}>Week</span>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
