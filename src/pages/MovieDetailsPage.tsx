import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../redux/movie/selectors';
import { getSelectedMovieByID } from '../redux/movie/operations';
import Loader from '../components/Loader/Loader';
import MovieDetails from '../components/MovieDetails/MovieDetails';

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const dispatch = useDispatch<any>();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getSelectedMovieByID(movieID!));
  }, [movieID, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>The resource you requested could not be found.</div>}
      <Toaster />
      <MovieDetails />
    </div>
  );
}
