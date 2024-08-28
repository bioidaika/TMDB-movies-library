import { FC, FormEvent, useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { searchMovieQuery } from '../components/api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();
  const query = params.get('query') ?? ' ';

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        setFilteredList([]);
        if (query === ' ') return;
        const data = await searchMovieQuery(query);
        setFilteredList(data);
      } catch (e: any) {
        setError(true);
        toast.error(e.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query]);

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
    <div>
      <Toaster />
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
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
      <MovieList filtered={filteredList} />
    </div>
  );
}
