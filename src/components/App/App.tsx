import { Suspense, lazy, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));
const TvPage = lazy(() => import('../../pages/TvPage'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import TvDetailsPage from '../../pages/TvDetailsPage';
import { PrivateRoute } from '../../pages/PrivateRoute';
import { RestrictRoute } from '../../pages/RestrictRoute';
import ConfirmGoogleAuth from '../ConfirmGoogleAuth/ConfirmGoogleAuth';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { refreshPage } from '../../redux/auth/operations';
import { selectIsLoading, selectToken } from '../../redux/auth/selectors';
import { FavoritePage } from '../../pages/FavoritePage';

export default function App() {
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token) dispatch(refreshPage());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      {isLoading && <Loader />}
      {!isLoading && (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieID" element={<MovieDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="/tv" element={<TvPage />} />
            <Route path="/tv/:series_id" element={<TvDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="/search/movie/" element={<SearchPage />} />
            <Route
              path="/auth/login"
              element={<PrivateRoute redirectTo="/saved" component={<SignInPage />} />}
            />
            <Route
              path="/auth/signup"
              element={<PrivateRoute redirectTo="/saved" component={<SignUpPage />} />}
            />
            <Route
              path="/saved"
              element={<RestrictRoute redirectTo="/auth/login" component={<FavoritePage />} />}
            />
            <Route
              path="/profile-settings"
              element={
                <RestrictRoute redirectTo="/auth/login" component={<div>Profile-settings</div>} />
              }
            />
            <Route path="/confirm-google-auth" element={<ConfirmGoogleAuth />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
