import MovieList from '../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import SearchForm from '../components/SearchForm/SearchForm';
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
