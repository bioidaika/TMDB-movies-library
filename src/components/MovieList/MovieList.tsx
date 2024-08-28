import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { FC, ReactNode } from 'react';

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface FilteredMovieProps {
  filtered: Movies[];
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
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default MovieList;
