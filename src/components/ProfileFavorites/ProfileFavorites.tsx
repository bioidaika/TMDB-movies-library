import { useSelector } from 'react-redux';
import { selectFavorite } from '../../redux/auth/selectors';
import css from './ProfileFavorites.module.css';
import { Link, useLocation } from 'react-router-dom';
import genres from '../genres.json';

export const ProfileFavorites: React.FC = () => {
  const genresList = JSON.stringify(genres);
  const genresOBJ = JSON.parse(genresList);
  const favorites = useSelector(selectFavorite);
  const location = useLocation();
  return (
    <div>
      <ul className={css.list}>
        {favorites && favorites.length === 0 && <div>No results</div>}
        {favorites &&
          favorites.map(item => (
            <li key={item.id} className={css.list_item}>
              <Link
                to={item.contentType === 'movie' ? `/movies/${item.id}` : `/tv/${item.id}`}
                state={location}
              >
                {/*  refactoring start */}
                {/* {item.poster_path != null && (
                  <img
                    loading="lazy"
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                    alt={item.title || 'No title available'}
                    className={css.img_poster}
                  />
                )}
                {item.poster_path == null && (
                  <img
                    loading="lazy"
                    src={`https://davooda.com/images/outline/outline-file-document-question-mark-icon_360_w.png`}
                    alt={'Unknown image'}
                    className={css.img_poster}
                  />
                )} */}
                {item.poster_path != null ? (
                  <img
                    loading="lazy"
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                    alt={item.title || 'No title available'}
                    className={css.img_poster}
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={`https://davooda.com/images/outline/outline-file-document-question-mark-icon_360_w.png`}
                    alt={'Unknown image'}
                    className={css.img_poster}
                  />
                )}
                {/*  refactoring end */}
                <div className={css.title}>{item.title}</div>
                <div className={css.description}>
                  <div className={css.details}>
                    {item.release_date ? item.release_date.substring(0, 4) : null}
                  </div>
                  {item.genres && item.genres[0] != null && item.release_date && (
                    <span> ,&nbsp;</span>
                  )}
                  <div className={css.details}>
                    {item.genres &&
                      genresOBJ.map((key: { id: number; name: string }) =>
                        key.id === (item.genres?.[0] ?? -1) ? key.name : null
                      )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
