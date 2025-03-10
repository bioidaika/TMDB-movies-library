import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { getMovieReviews } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IReviews } from '../../types/types';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedReviews, setSelectedReviews] = useState<IReviews[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieReviews(movieID || '');
        setSelectedReviews(data);
        if (data.length !== 0) {
          toast.success('Success');
        } else {
          toast.error('No results');
        }
      } catch (e: unknown) {
        setError(true);
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.status_message);
        } else {
          toast.error('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);
  return (
    <div>
      <Toaster />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ul className={css.reviews__list}>
            {selectedReviews && selectedReviews.length > 0 ? (
              selectedReviews.map(item => (
                <li key={item.id} className={css.reviews__card}>
                  <h2>
                    Written by {item.author} on{' '}
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h2>
                  <p>{item.content}</p>
                </li>
              ))
            ) : (
              <p className={css.no_reviews}>{`We don't have any reviews for this movie.`}</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
