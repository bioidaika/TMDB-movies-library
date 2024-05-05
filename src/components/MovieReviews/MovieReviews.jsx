import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { getMovieReviews } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedReviews, setSelectedReviews] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieReviews(movieID);
        setSelectedReviews(data);
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e) {
        setError(true);
        toast.error(e.message);
        toast.error(e.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);
  return (
    <div>
      <Toaster />
      {isLoading && <b>Loading...</b>}
      {error && <b>HTTP error!</b>}
      <h1>Reviews</h1>
      <ul className={css.reviews__list}>
        {selectedReviews &&
          selectedReviews.map(item => (
            <li key={item.id} className={css.reviews__card}>
              <h2>A review by {item.author}</h2>
              <p>{item.content}</p>
            </li>
          ))}
        {selectedReviews.length === 0 && <p>{`We don't have any reviews for this movie.`}</p>}
      </ul>
    </div>
  );
}
