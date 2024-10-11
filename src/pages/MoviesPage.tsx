import { FC, FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieListByParam } from '../redux/movie/operations';
import { selectMovieParam } from '../redux/movie/selectors';
import { MoviesCategory } from '../components/MoviesCategory/MoviesCategory';

const MoviesPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const movieParams = useSelector(selectMovieParam);

  useEffect(() => {
    dispatch(getMovieListByParam(movieParams));
  }, [movieParams, dispatch]);

  return (
    <div>
      <Toaster />
      <SearchForm />
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
      <MoviesCategory>
        <MovieList />
      </MoviesCategory>
    </div>
  );
};
export default MoviesPage;
