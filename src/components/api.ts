import axios from 'axios';
import { IMovie, IMovieByID, ICast, IReviews } from '../types/types';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const options = {
  method: 'GET',
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4',
  },
};

export const getTrendingMovies = async (): Promise<IMovie[]> => {
  const response = await axios.get('trending/movie/day', options);
  console.log(response.data.results);
  return response.data.results as IMovie[];
};

export const getMovieByID = async (movieID: string): Promise<IMovieByID> => {
  const response = await axios.get(`movie/${movieID}`, options);
  // console.log(response.data);
  return response.data as IMovieByID;
};

export const getMovieCasts = async (movieID: string): Promise<ICast[]> => {
  const response = await axios.get(`movie/${movieID}/credits`, options);
  //   console.log(response.data.cast);
  return response.data.cast as ICast[];
};

export const getMovieReviews = async (movieID: string) => {
  const response = await axios.get(`movie/${movieID}/reviews`, options);
  //   console.log(response.data.results);
  return response.data.results as IReviews[];
};

export const searchMovieQuery = async (searchQuery: string) => {
  const response = await axios.get(`search/movie?query=${searchQuery}`, options);
  // console.log(response.data.results);
  return response.data.results;
};
