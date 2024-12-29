import { FormEvent, useEffect, useState, memo, FC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';
import { useDispatch } from 'react-redux';
import { searchMovieReq } from '../../redux/movie/operations';
import { IoSearch } from 'react-icons/io5';

interface SearchFormProps {
  styleModule?: { [key: string]: string };
}

const SearchForm: FC<SearchFormProps> = memo(({ styleModule = css }) => {
  const dispatch = useDispatch<any>();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const queryURL = params.get('query') ?? '';
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
      if (queryURL === '') return;
      dispatch(searchMovieReq(queryURL));
    } catch (e: any) {
      toast.error(`Error: ${queryURL}`);
    } finally {
    }
  }

  useEffect(() => {
    setInputValue(queryURL);
    getData();
  }, [queryURL]);

  return (
    <form onSubmit={handleSubmit} className={styleModule.searchForm}>
      <input
        type="text"
        name="searchField"
        placeholder="Search for a movie, tv show, person..."
        className={styleModule.searchInput}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button type="submit" className={styleModule.searchButton}>
        <IoSearch />
      </button>
    </form>
  );
});

export default SearchForm;
