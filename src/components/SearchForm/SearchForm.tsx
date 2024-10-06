import { FormEvent, useEffect, useMemo, useState, memo } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieReq } from '../../redux/movie/operations';

const SearchForm = memo(() => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const queryURL = params.get('query') ?? ' ';
  const [inputValue, setInputValue] = useState(queryURL);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const { searchField } = form.elements as HTMLFormControlsCollection & {
      searchField: HTMLInputElement;
    };
    const query = searchField.value.trim();
    if (query !== '') {
      setParams({ query });
      dispatch(searchMovieReq(query));
      navigate(`../search/movie/?query=${query}`);
    } else {
      toast.error('Search field is empty');
    }
  };

  async function getData() {
    try {
      // setIsLoading(true);
      // setError(false);
      // console.log('Query Request', queryURL);
      if (queryURL === ' ') return;
      // console.log('Query Request 1', queryURL);
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
  // }, [inputValue]);

  useEffect(() => {
    setInputValue(queryURL);
    getData();
  }, [queryURL]);

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="searchField"
        placeholder="Search for a movie, tv show, person......"
        className={css.searchText}
        value={inputValue.trim()}
        onChange={e => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
});

// function onChangeInput(e: FormEvent<HTMLInputElement>) {
//   const sr = e.target;
//   sr.value = 'Hello'
// }
export default SearchForm;
