import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import { getMovieList } from '../redux/movie/operations';
import { useDispatch, useSelector } from 'react-redux';
import Trending from '../components/Trending/Trending';
import { selectTrendingOption } from '../redux/movie/selectors';
import SearchForm from '../components/SearchForm/SearchForm';
import Welcome from '../components/Welcome/Welcome';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const queryURL = params.get('query') ?? ' ';
  //   const dispatch = useDispatch<any>();
  //   const trendingOption = useSelector(selectTrendingOption);
  //   useEffect(() => {
  //     dispatch(getMovieList(trendingOption));
  //   }, [trendingOption, dispatch]);

  return (
    <>
      <Toaster />
      <SearchForm />
      <h2>Search results for {queryURL}</h2>
      <MovieList />
    </>
  );
}
