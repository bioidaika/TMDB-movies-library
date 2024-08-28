import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList.tsx';
import { getTrendingMovies } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';

export default function HomePage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setMovieList([]);
        setError(false);
        const data = await getTrendingMovies();
        data.length != 0 ? toast.success('Success') : toast.error('No results');
        setMovieList(data);
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {isLoading && <b>Loading moviews...</b>}
      {error && <b>HTTP error!</b>}
      <Toaster />
      <h1>Trending Today</h1>
      <MovieList filtered={movieList} />
    </div>
  );
}
