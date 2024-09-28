import { FC, FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';

const MoviesPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <div>
      <Toaster />
      {/* <SearchForm /> */}
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
      <MovieList />
    </div>
  );
};
export default MoviesPage;
