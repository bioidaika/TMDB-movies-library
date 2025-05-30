import { authState } from '../redux/auth/slice';
import { MovieState } from '../redux/movie/slice';

export interface IMovie {
  id: number;
  title?: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
}

export interface ITVShow {
  id: number;
  name?: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
}

export interface IMovieTV extends ITVShow, IMovie {}

export interface IData {
  page: number;
  results: IMovieTV[];
  total_pages: number;
  total_results: number;
}

export interface IMovieByID {
  id: number;
  adult: boolean;
  title: string;
  original_title: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  genres: [{ id: number; name: string }];
  overview: string;
  budget: number;
  imdb_id: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  tagline: string;
}

export interface ITVByID {
  id: number;
  adult: boolean;
  name: string;
  original_name: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  genres: [{ id: number; name: string }];
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  tagline: string;
}

export interface isActive {
  isActive: boolean;
}

export interface ICast {
  adult: boolean;
  character: string;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface IReviews {
  author: string;
  author_details: {
    name: string;
    avatar_path: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  url: string;
}

export interface Movie {
  movie: MovieState;
}

export interface Auth {
  auth: authState;
}

export interface IfavoriteItem {
  backdrop_path: string;
  genres: number[];
  media_id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  contentType: string;
}

export interface user {
  _id: string | null;
  name: string | null;
  email: string | null;
  gender: string | null;
  avatar: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IupdateUser {
  name: string | null;
  email: string | null;
  gender: string | null;
}

export interface removeFavoriteData {
  media_id: number;
  contentType: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
