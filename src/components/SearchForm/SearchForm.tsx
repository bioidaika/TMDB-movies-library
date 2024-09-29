import { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, redirect, useNavigate, useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieQuery } from '../api';
import { setMovieList } from '../../redux/movie/slice';
import { selectRandom_BG } from '../../redux/movie/selectors';
import { searchMovieReq } from '../../redux/movie/operations';

const SearchForm = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // const randomBG = useSelector(selectRandom_BG);
  const queryURL = params.get('query') ?? ' ';
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const { searchField } = form.elements as HTMLFormControlsCollection & {
      searchField: HTMLInputElement;
    };
    const query = searchField.value.trim();
    if (query !== '') {
      params.set('query', query);
      setParams({ query });
      dispatch(searchMovieReq(query));
    } else {
      toast.error('Search field is empty');
    }
    navigate(`../search/movie/?query=${query}`);
  };

  async function getData() {
    try {
      // setIsLoading(true);
      // setError(false);
      console.log('Query Request', queryURL);

      if (queryURL === ' ') return;
      console.log('Query Request 1', queryURL);
      dispatch(searchMovieReq(queryURL));
      console.log('Query Request 2');
    } catch (e: any) {
      // setError(true);
      toast.error(`Error: ${queryURL}`);
    } finally {
      // setIsLoading(false);
    }
  }

  // useMemo(() => {
  //   return getData();
  // }, [queryURL]);

  useEffect(() => {
    getData();
  }, [queryURL]);

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="searchField"
        placeholder="Search movies"
        className={css.searchText}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
