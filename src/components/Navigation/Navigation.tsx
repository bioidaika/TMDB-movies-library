import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import searchFormStyles from '../SearchForm/SearchFormMain.module.css';
import clsx from 'clsx';
import { memo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import { FaFilm, FaTv } from 'react-icons/fa';

const makeLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Navigation = memo(function Navigation() {
  return (
    <nav className={css.nav}>
      <div className={css.menu}>
        <NavLink to="/">
          <img
            alt="The Movie Database (TMDB)"
            className={css.headerLogo}
            src="https://files.readme.io/29c6fee-blue_short.svg"
          />
        </NavLink>
        <NavLink to="/movies" className={makeLinkClass}>
          <FaFilm className={css.icon} /> Movies
        </NavLink>
        <NavLink to="/tv" className={makeLinkClass}>
          <FaTv className={css.icon} /> TV Shows
        </NavLink>
      </div>
      <div className={css.searchField}>
        <SearchForm styleModule={searchFormStyles} />
      </div>
    </nav>
  );
});
export default Navigation;
