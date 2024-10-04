import { useEffect, useMemo, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import { getMovieList } from '../redux/movie/operations';
import { useDispatch, useSelector } from 'react-redux';
import Trending from '../components/Trending/Trending';
import { selectTrendingOption } from '../redux/movie/selectors';
import SearchForm from '../components/SearchForm/SearchForm';
import Welcome from '../components/Welcome/Welcome';

export default function HomePage() {
  const dispatch = useDispatch<any>();
  const trendingOption = useSelector(selectTrendingOption);
  useEffect(() => {
    dispatch(getMovieList(trendingOption));
  }, [trendingOption, dispatch]);

  // useMemo(() => {
  //   return;
  // }, [second]);

  return (
    <>
      <Toaster />
      <Welcome>
        <SearchForm />
      </Welcome>
      <Trending>
        <MovieList />
      </Trending>
      ;
    </>
  );
}
