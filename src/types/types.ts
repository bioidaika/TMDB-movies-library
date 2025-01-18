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
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IDataTV {
  page: number;
  results: ITVShow[];
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
  cast_id: number;
  character: string;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface ITVCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
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

export interface ITVReviews {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface Movie {
  movie: MovieState;
}

export interface Auth {
  auth: authState;
}
