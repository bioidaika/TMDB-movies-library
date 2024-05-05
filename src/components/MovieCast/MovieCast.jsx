import { useEffect, useState } from 'react';
import { getMovieCasts } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedCast, setSelectedCast] = useState(null);
  // const defaultSRC = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`;
  const defaultSRC = `https://assets.mycast.io/actor_images/actor-an-unknown-actor-465215_large.jpg`;
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieCasts(movieID);
        setSelectedCast(data);
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
      <h1>Casts</h1>
      <ul className={css.cast__list}>
        {selectedCast &&
          selectedCast.map(item => (
            <li key={item.cast_id} className={css.cast__card}>
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
              <p>Character: {item.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
