import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieQuery } from '../api';
import { setMovieList } from '../../redux/movie/slice';
import { selectRandom_BG } from '../../redux/movie/selectors';

const SearchForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const randomBG = useSelector(selectRandom_BG);
  const query = params.get('query') ?? ' ';
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    navigate('/search');
    const form = evt.target as HTMLFormElement;
    const { searchField } = form.elements as HTMLFormControlsCollection & {
      searchField: HTMLInputElement;
    };
    const query = searchField.value.trim();

    if (query !== '') {
      params.set('query', query);
      setParams({ query });
    } else {
      toast.error('Search field is empty');
    }
    // navigate('/search');
  };

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
    <div
      className={css.container}
      style={{
        backgroundImage: `image-set(url(https://media.themoviedb.org/t/p/w1920_and_h600_face/${randomBG}) 1x, url(https://media.themoviedb.org/t/p/w3840_and_h1200_face/${randomBG}) 2x)`,
      }}
    >
      <div className={css.section}>
        <div className={css.title}>
          <h2 className={css.title_welcome}>Welcome.</h2>
          <h3 className={css.title_desc}>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="searchField"
            placeholder="Search movies"
            className={css.searchText}
            // onSubmit={(event: any) => {
            // params.set('query', query);
            // }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
