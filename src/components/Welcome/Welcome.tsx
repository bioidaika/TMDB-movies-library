import css from './Welcome.module.css';
import { useSelector } from 'react-redux';
import { selectLoading, selectRandom_BG } from '../../redux/movie/selectors';
import { FC, ReactNode, useMemo } from 'react';

interface WelcomeI {
  children?: ReactNode;
}
const Welcome: FC<WelcomeI> = ({ children }) => {
  const randomBG = useSelector(selectRandom_BG);
  const isLoading = useSelector(selectLoading);
  // const bgStyles = useMemo(() => {
  //   const bg = {
  //     backgroundImage: `image-set(url(https://media.themoviedb.org/t/p/w1920_and_h600_face${randomBG}) 1x, url(https://media.themoviedb.org/t/p/w3840_and_h1200_face${randomBG}) 2x)`,
  //   };
  //   return bg;
  // }, [randomBG]);

  return (
    !isLoading && (
      <div
        className={css.container}
        style={{
          backgroundImage: `image-set(url(https://media.themoviedb.org/t/p/w1920_and_h600_face${randomBG}) 1x, url(https://media.themoviedb.org/t/p/w3840_and_h1200_face${randomBG}) 2x)`,
        }}
        // style={bgStyles}
      >
        <div className={css.section}>
          <div className={css.title}>
            <h2 className={css.title_welcome}>Welcome.</h2>
            <h3 className={css.title_desc}>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Welcome;
