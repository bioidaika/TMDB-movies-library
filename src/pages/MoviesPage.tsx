import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieListByParam } from '../redux/movie/operations';
import { selectLoading, selectMovieParam } from '../redux/movie/selectors';
import { MoviesCategory } from '../components/MoviesCategory/MoviesCategory';

const MoviesPage: FC = () => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch<any>();
  const movieParams = useSelector(selectMovieParam);

  useEffect(() => {
    dispatch(getMovieListByParam(movieParams));
  }, [movieParams, dispatch]);

  return (
    !isLoading && (
      <div>
        <Toaster />
        <SearchForm />
        <MoviesCategory>
          <MovieList />
        </MoviesCategory>
      </div>
    )
  );
};
export default MoviesPage;
