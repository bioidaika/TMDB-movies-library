import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import { getMovieList } from '../redux/movie/operations';
import { useDispatch, useSelector } from 'react-redux';
import { Trending } from '../components/Trending/Trending';
import { selectTrendingOption } from '../redux/movie/selectors';

export default function HomePage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const dispatch = useDispatch<any>();
  const trendingOption = useSelector(selectTrendingOption);

  useEffect(() => {
    dispatch(getMovieList(trendingOption));
  }, [trendingOption, dispatch]);

  return (
    <>
      <Toaster />

      <Trending>
        <MovieList />
      </Trending>
    </>
  );
}
