import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';

const SearchForm = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('query') ?? ' ';
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
    } else {
      toast.error('Search field is empty');
    }
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="searchField"
        placeholder="Search movies"
        className={css.searchText}
        onSubmit={(event: any) => {
          params.set('query', query);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
