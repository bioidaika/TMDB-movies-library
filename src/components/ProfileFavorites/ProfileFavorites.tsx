import { useSelector } from 'react-redux';
import { selectFavorite } from '../../redux/auth/selectors';
import css from './ProfileFavorites.module.css';
import { Link, useLocation } from 'react-router-dom';
import genres from '../genres.json';
import { useMemo } from 'react';

export const ProfileFavorites: React.FC = () => {
  const genresOBJ = useMemo(() => {
    return new Map(genres.map(g => [g.id, g.name]));
  }, []);

  const favorites = useSelector(selectFavorite);
  const location = useLocation();
  return (
    <div>
      <h1 className={css.header}>Saved Movies & TV Shows</h1>
      {favorites && favorites.length === 0 && <div className={css.noResults}>No results</div>}
      <ul className={css.list}>
        {favorites &&
          favorites.map(item => (
            <li key={item.media_id} className={css.list_item}>
              <Link
                to={
                  item.contentType === 'movie' ? `/movies/${item.media_id}` : `/tv/${item.media_id}`
                }
                state={location}
              >
                <img
                  loading="lazy"
                  src={
                    item.poster_path
                      ? `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`
                      : 'https://davooda.com/images/outline/outline-file-document-question-mark-icon_360_w.png'
                  }
                  alt={item.title || 'No title available'}
                  className={css.img_poster}
                />
                <div className={css.title}>{item.title}</div>
                <div className={css.description}>
                  {item.release_date && (
                    <div className={css.details}>{item.release_date.slice(0, 4)}</div>
                  )}
                  {item.genres && item.genres.length > 0 && (
                    <>
                      <span className={css.separator}>,&nbsp;</span>
                      <div className={css.details}>
                        {genresOBJ.get(item.genres[0]) || 'Unknown Genre'}
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
