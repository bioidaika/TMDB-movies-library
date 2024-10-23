import { Link, NavLink } from 'react-router-dom';
import css from './Footer.module.css';
import clsx from 'clsx';
import { memo } from 'react';

const Footer = memo(() => {
  return (
    <nav className={css.nav}>
      <div className={css.menu}>
        <NavLink to="/" className={css.link}>
          <img
            alt="The Movie Database (TMDB)"
            className={css.headerLogo}
            src="https://files.readme.io/29c6fee-blue_short.svg"
          />
        </NavLink>
        <a
          href="https://github.com/DmytriiTsybuliak"
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
        >
          Linkedin
        </a>
      </div>
    </nav>
  );
});

export default Footer;
