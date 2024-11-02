import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../redux/movie/selectors';
import { getSelectedTvByID } from '../redux/movie/operations';
import Loader from '../components/Loader/Loader';
import TvDetails from '../components/TvDetails/TvDetails';

export default function TvDetailsPage() {
  const { series_id } = useParams();
  const dispatch = useDispatch<any>();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getSelectedTvByID(series_id!));
  }, [series_id, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>The resource you requested could not be found.</div>}
      <TvDetails />
    </div>
  );
}
