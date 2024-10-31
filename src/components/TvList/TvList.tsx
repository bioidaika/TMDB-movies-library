import { Link, useLocation } from 'react-router-dom';
import css from './TvList.module.css';
import genres from '../genres.json';
import { FC, ReactNode } from 'react';
import { ITVShow } from '../../types/types';
import { useSelector } from 'react-redux';
import { selectLoading, selectTVList } from '../../redux/movie/selectors';

interface FilteredTVProps {
  filtered?: ITVShow[];
  children?: ReactNode;
}

const TvList: FC<FilteredTVProps> = ({ children }) => {
  const genresList = JSON.stringify(genres);
  const genresOBJ = JSON.parse(genresList);
  const isLoading = useSelector(selectLoading);
  const location = useLocation();
  const tvLister: ITVShow[] = useSelector(selectTVList);

  return (
    !isLoading && (
      <div>
        <ul className={css.list}>
          {tvLister.length === 0 && <div>No results</div>}
          {tvLister.map(item => (
            <li key={item.id} className={css.list_item}>
              {/* нужно заменить нижнюю строку */}
              <Link to={`/movies/${item.id}`} state={location}>
                {/* нужно заменить верхнюю строку */}
                {item.poster_path != null && (
                  <img
                    loading="lazy"
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                    alt={item.name}
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
                )}

                <div className={css.title}>{item.name}</div>
                <div className={css.description}>
                  <div className={css.details}>
                    {item.first_air_date.length != 0 ? item.first_air_date.substring(0, 4) : null}
                  </div>
                  {item.first_air_date.length != 0 && item.genre_ids[0] != null && (
                    <span> ,&nbsp;</span>
                  )}
                  <div className={css.details}>
                    {item.genre_ids[0] != null &&
                      genresOBJ.map((key: { id: number; name: string }) =>
                        key.id == item.genre_ids[0] ? key.name : null
                      )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    )
  );
};

export default TvList;
