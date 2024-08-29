import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { FC, ReactNode } from 'react';
import { IMovie } from '../../types/types';

interface FilteredMovieProps {
  filtered: IMovie[];
  children?: ReactNode;
}

const MovieList: FC<FilteredMovieProps> = ({ filtered, children }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.list}>
        {filtered.map(item => (
          <li key={item.id} className={css.list_item}>
            <Link to={`/movies/${item.id}`} state={location}>
              <img
                loading="lazy"
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                alt={item.title}
              ></img>
              <div className={css.title}>{item.title}</div>
            </Link>
            {/* <p>{item.overview}</p> */}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default MovieList;
