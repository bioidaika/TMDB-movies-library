import { FC, MouseEvent, useState } from 'react';
import css from './Trending.module.css';
import clsx from 'clsx';

export const Trending: FC = () => {
  const [activeButton, setActiveButton] = useState<'today' | 'week'>('today');

  const makeLinkClass = (buttonType: 'today' | 'week') => {
    return clsx(css.trending__item, activeButton === buttonType ? css.active : '');
  };
  const HandleClick = (evt: MouseEvent<HTMLButtonElement>, buttonType: 'today' | 'week') => {
    setActiveButton(buttonType);
    console.log('Hello');
  };

  return (
    <div className={css.trending}>
      <h2 className={css.trending__header}>Trending</h2>
      <div className={css.trending__list}>
        <button className={makeLinkClass('today')} onClick={evt => HandleClick(evt, 'today')}>
          <span className={css.trending__text}>Today</span>
        </button>
        <button className={makeLinkClass('week')} onClick={evt => HandleClick(evt, 'week')}>
          <span className={css.trending__text}>Week</span>
        </button>
      </div>
    </div>
  );
};
