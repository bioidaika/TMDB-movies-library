import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieListByParam } from '../redux/movie/operations';
import { selectLoading } from '../redux/movie/selectors';
import { Category } from '../components/Category/Category';
import Pagination from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { setMovieParam, setPage } from '../redux/movie/slice';
import { AppDispatch } from '../redux/store';

const MoviesPage: FC = () => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch<AppDispatch>();
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
