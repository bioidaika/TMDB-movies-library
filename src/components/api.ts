import axios from 'axios';
import {
  IMovie,
  IMovieByID,
  ICast,
  IReviews,
  IData,
  IDataTV,
  ITVByID,
  ITVCast,
  ITVReviews,
} from '../types/types';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const options = {
  method: 'GET',
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4',
  },
};

export const getTrendingMovies = async (range: string): Promise<IMovie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/${range}`, options);
  // console.log(response.data.results);
  // console.log(response.data);
  return response.data.results as IMovie[];
};

export const getMovieByID = async (movieID: string): Promise<IMovieByID> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, options);
  // console.log(response.data);
  return response.data as IMovieByID;
};

export const getTvByID = async (series_id: string): Promise<ITVByID> => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}`, options);
  console.log(response.data);
  return response.data as ITVByID;
};

export const getMovieCasts = async (movieID: string): Promise<ICast[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/credits`,
    options
  );
  //   console.log(response.data.cast);
  return response.data.cast as ICast[];
};

export const getTVCasts = async (series_id: string): Promise<ITVCast[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/credits`, options);
  //   console.log(response.data.cast);
  return response.data.cast as ITVCast[];
};

export const getMovieReviews = async (movieID: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews`,
    options
  );
  //   console.log(response.data.results);
  return response.data.results as IReviews[];
};

export const getTvReviews = async (series_id: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/reviews`, options);
  //   console.log(response.data.results);
  return response.data.results as ITVReviews[];
};

export const searchMovieQuery = async (searchQuery: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
    options
  );
  const responseTV = await axios.get(
    `https://api.themoviedb.org/3/search/tv?query=${searchQuery}`,
    options
  );
  // console.log(response.data.results);
  const data = [...response.data.results, ...responseTV.data.results];
  // console.log('data', data);
  // console.log('response Movie', response.data.results);
  // console.log('response TV', responseTV.data.results);
  // return response.data.results;
  return data;
};

export const getMovieList = async (range: string, pageN: number): Promise<IData> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${range}`, {
    ...options,
    params: {
      page: pageN,
    },
  });
  // console.log(response.data);
  // return response.data.results as IMovie[];
  return response.data as IData;
};

export const getTVList = async (range: string, pageN: number): Promise<IDataTV> => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${range}`, {
    ...options,
    params: {
      page: pageN,
    },
  });
  // console.log(response.data);
  // return response.data.results as IMovie[];
  return response.data as IDataTV;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    `https://movies-library-backend-s1fd.onrender.com/auth/login/`,
    data
  );
  // console.log(response.data.results);
  // console.log(response.data);
  return response.data;
};
