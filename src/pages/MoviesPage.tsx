import { FC, FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { searchMovieQuery } from '../components/api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import { useDispatch } from 'react-redux';
import { setMovieList } from '../redux/movie/slice';
import SearchForm from '../components/SearchForm/SearchForm';

const MoviesPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useSearchParams();
  const query = params.get('query') ?? ' ';
  const dispatch = useDispatch<any>();

  async function getData() {
    try {
      setIsLoading(true);
      setError(false);
      if (query === ' ') return;
      const data = await searchMovieQuery(query);
      dispatch(setMovieList(data));
    } catch (e: any) {
      setError(true);
      toast.error(e.response.data.status_message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, [query]);

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
