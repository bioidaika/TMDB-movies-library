import { useEffect } from 'react';
import css from './Reviews.module.css';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { AppDispatch } from '../../redux/store';
import { selectLoading, selectSelectedReviews } from '../../redux/movie/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsMovieOP, getReviewsTVOP } from '../../redux/movie/operations';

export default function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLoading);
  const selectedReviews = useSelector(selectSelectedReviews);
  const { movieID, series_id } = useParams();
  const Params = useParams();
  // console.log(Params);

  useEffect(() => {
    if (Params.movieID) {
      dispatch(getReviewsMovieOP(movieID!));
    }
    if (Params.series_id) {
      dispatch(getReviewsTVOP(series_id!));
    }
  }, [movieID, series_id, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ul className={css.reviews__list}>
            {selectedReviews && selectedReviews.length > 0 ? (
              selectedReviews.map(item => <ReviewCard key={item.id} item={item} />)
            ) : (
              <p className={css.no_reviews}>{`We don't have any reviews for this movie.`}</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
