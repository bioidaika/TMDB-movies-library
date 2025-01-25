import { Suspense, lazy } from 'react';
import Navigation from '../Navigation/Navigation';
const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const TvPage = lazy(() => import('../../pages/TvPage'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import TvDetailsPage from '../../pages/TvDetailsPage';
import TvCast from '../TvCast/TvCast';
import TvReviews from '../TvReviews/TvReviews';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import { PrivateRoute } from '../../pages/PrivateRoute';
import { RestrictRoute } from '../../pages/RestrictRoute';
import ConfirmGoogleAuth from '../ConfirmGoogleAuth/ConfirmGoogleAuth';

export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieID" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/tv" element={<TvPage />} />
          <Route path="/tv/:series_id" element={<TvDetailsPage />}>
            <Route path="cast" element={<TvCast />} />
            <Route path="reviews" element={<TvReviews />} />
          </Route>
          <Route path="/search/movie/" element={<SearchPage />} />
          <Route
            path="/auth/login"
            element={<PrivateRoute redirectTo="/auth/my-profile" component={<SignIn />} />}
          />
          <Route
            path="/auth/signup"
            element={<PrivateRoute redirectTo="/auth/my-profile" component={<SignUp />} />}
          />
          <Route
            path="/auth/my-profile"
            element={<RestrictRoute redirectTo="/auth/login" component={<div>My profile</div>} />}
          />
          <Route path="/confirm-google-auth" element={<ConfirmGoogleAuth />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}
