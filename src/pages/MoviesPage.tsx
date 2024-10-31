import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieListByParam } from '../redux/movie/operations';
import { selectCurrentPage, selectLoading, selectMovieParam } from '../redux/movie/selectors';
import { Category } from '../components/Category/Category';
import Pagination from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { setMovieParam, setPage } from '../redux/movie/slice';

const MoviesPage: FC = () => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch<any>();
  const movieParams = useSelector(selectMovieParam);
  const currentPage = useSelector(selectCurrentPage);
  const [params, setParams] = useSearchParams();
  const pageParam = params.get('page') ?? '1';
  const sectionParam = params.get('section') ?? 'now_playing';
  const queryParams = ['now_playing', 'popular', 'top_rated', 'upcoming'];

  useEffect(() => {
    dispatch(setMovieParam(sectionParam));
    dispatch(setPage(Number(pageParam)));
  }, [dispatch, sectionParam, pageParam]);

  useEffect(() => {
    dispatch(getMovieListByParam({ range: sectionParam, pageN: Number(pageParam) }));
    console.log('pageParam:', pageParam);
    console.log('sectionParam:', sectionParam);
  }, [dispatch, sectionParam, pageParam]);

  return (
    !isLoading && (
      <div>
        <Toaster />
        <Category queryParams={queryParams}>
          <MovieList />
          <Pagination />
        </Category>
      </div>
    )
  );
};
export default MoviesPage;
