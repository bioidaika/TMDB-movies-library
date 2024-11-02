import { useEffect, useState } from 'react';
import { getTVCasts } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import css from './TvCast.module.css';
import { AxiosError } from 'axios';
import { ITVCast } from '../../types/types';
import Loader from '../Loader/Loader';

export default function TvCast() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { series_id } = useParams();
  const [selectedCast, setSelectedCast] = useState<ITVCast[] | null>(null);
  const defaultSRC = `https://assets.mycast.io/actor_images/actor-an-unknown-actor-465215_large.jpg`;
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTVCasts(series_id || '');
        setSelectedCast(data);
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e: unknown) {
        setError(true);
        e instanceof AxiosError
          ? toast.error(e.response?.data?.status_message)
          : toast.error('An unkown error occured');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [series_id]);

  return (
    <div>
      <Toaster />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h1>Casts</h1>
          <ul className={css.cast__list}>
            {selectedCast &&
              selectedCast.map(item => (
                <li key={item.id} className={css.cast__card}>
                  <img
                    className={css.image}
                    src={
                      item.profile_path !== null && item.profile_path !== ''
                        ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                        : defaultSRC
                    }
                    alt={item.name}
                    style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                  />

                  <h2>{item.name}</h2>
                  <p>Character: {item.character || 'Unknown'}</p>
                  <p>Popularity: {item.popularity.toFixed(1)}</p>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
