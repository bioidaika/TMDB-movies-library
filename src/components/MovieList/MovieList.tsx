import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import genres from '../genres.json';
import { FC, ReactNode, useState } from 'react';
import { IMovie } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectLoading,
  selectMovieList,
  selectTotalPages,
} from '../../redux/movie/selectors';
import ReactPaginate from 'react-paginate';
import { setPage } from '../../redux/movie/slice';

interface FilteredMovieProps {
  filtered?: IMovie[];
  children?: ReactNode;
}

const MovieList: FC<FilteredMovieProps> = ({ children }) => {
  const genresList = JSON.stringify(genres);
  const genresOBJ = JSON.parse(genresList);
  const isLoading = useSelector(selectLoading);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const location = useLocation();
  const movieLister: IMovie[] = useSelector(selectMovieList);
  const dispatch = useDispatch();
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // const [itemOffset, setItemOffset] = useState(0);

  const pagesArray = [];
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }
  // console.log(pagesArray);

  const handlePageClick = (event: { selected: number }) => {
    console.log('event.selected', event.selected + 1);
    dispatch(setPage(event.selected + 1));
    // console.log('movieLister.length', movieLister.length);
    // const newOffset = (event.selected * 20) % movieLister.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    // setItemOffset(newOffset);
  };

  return (
    !isLoading && (
      <div>
        <ul className={css.list}>
          {movieLister.length === 0 && <div>No results</div>}

          {movieLister.map(item => (
            <li key={item.id} className={css.list_item}>
              <Link to={`/movies/${item.id}`} state={location}>
                {item.poster_path != null && (
                  <img
                    loading="lazy"
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                    alt={item.title}
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

                <div className={css.title}>{item.title}</div>
                <div className={css.description}>
                  <div className={css.details}>
                    {item.release_date.length != 0 ? item.release_date.substring(0, 4) : null}
                  </div>
                  {item.release_date.length != 0 && item.genre_ids[0] != null && (
                    <span> ,&nbsp;</span>
                  )}
                  <div className={css.details}>
                    {/* {item.genre_ids.map(id =>
                      genresOBJ.map((item: { id: number; name: string }) =>
                        item.id == id ? item.name + ' ' : null
                      )
                    )} */}
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
        {/* <ul className={css.pagination}>
          {pagesArray.map(item => (
            <li key={item} className={css.paginationItem}>
              {item}
            </li>
          ))}
        </ul> */}
        <ReactPaginate
          className={css.pagination}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          marginPagesDisplayed={3}
          pageClassName={css.paginationItem}
          pageLinkClassName={css.paginationLink}
          activeLinkClassName={css.activePage}
          pageRangeDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
        {children}
      </div>
    )
  );
};

export default MovieList;
