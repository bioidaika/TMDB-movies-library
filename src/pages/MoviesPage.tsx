import { FC, FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';
import { useDispatch } from 'react-redux';
import { getMovieListOp } from '../redux/movie/operations';

const MoviesPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getMovieListOp('now_playing'));
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <SearchForm />
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
      <MovieList />
    </div>
  );
};
export default MoviesPage;
