import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { getTrendingMovies } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';
import { IMovie } from '../types/types';
import { getMovieList } from '../redux/movie/operations';
import { useDispatch } from 'react-redux';

export default function HomePage() {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<any>();

  async function getData() {
    try {
      setIsLoading(true);
      setMovieList([]);
      setError(false);
      const data = await getTrendingMovies();
      data.length != 0 ? toast.success('Success') : toast.error('No results');
      setMovieList(data);
      // console.log(data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   getData();
  //   // dispatch(getMovieList());
  // }, []);
  useEffect(() => {
    dispatch(getMovieList());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <b>Loading moviews...</b>}
      {error && <b>HTTP error!</b>}
      <Toaster />
      <h1>Trending Today</h1>
      <MovieList />
    </div>
  );
}
