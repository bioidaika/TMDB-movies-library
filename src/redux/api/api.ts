import axios from 'axios';
import {
  IMovie,
  IMovieByID,
  ICast,
  IReviews,
  IData,
  ITVByID,
  removeFavoriteData,
  IfavoriteItem,
} from '../../types/types';

const axiosTheMovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: { language: 'vi-VN' },
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4',
  },
});
export const myBackendAxios = axios.create({
  baseURL: 'https://movies-library-backend-s1fd.onrender.com/',
  withCredentials: true,
});

export const getTrendingMovies = async (range: string): Promise<IMovie[]> => {
  const response = await axiosTheMovieDB.get(`trending/movie/${range}`);
  // console.log(response.data);
  return response.data.results as IMovie[];
};

export const getMovieByID = async (movieID: string): Promise<IMovieByID> => {
  const response = await axiosTheMovieDB.get(`movie/${movieID}`);
  // console.log(response.data);
  return response.data as IMovieByID;
};

export const getTvByID = async (series_id: string): Promise<ITVByID> => {
  const response = await axiosTheMovieDB.get(`tv/${series_id}`);
  // console.log(response.data);
  return response.data as ITVByID;
};

export const getMovieCasts = async (movieID: string): Promise<ICast[]> => {
  const response = await axiosTheMovieDB.get(`movie/${movieID}/credits`);
  //   console.log(response.data.cast);
  return response.data.cast as ICast[];
};

export const getTVCasts = async (series_id: string): Promise<ICast[]> => {
  const response = await axiosTheMovieDB.get(`tv/${series_id}/credits`);
  //   console.log(response.data.cast);
  return response.data.cast as ICast[];
};

export const getMovieReviews = async (movieID: string) => {
  const response = await axiosTheMovieDB.get(`movie/${movieID}/reviews`);
  //   console.log(response.data.results);
  return response.data.results as IReviews[];
};

export const getTvReviews = async (series_id: string) => {
  const response = await axiosTheMovieDB.get(`tv/${series_id}/reviews`);
  //   console.log(response.data.results);
  return response.data.results as IReviews[];
};

export const searchMovieQuery = async (searchQuery: string) => {
  const response = await axiosTheMovieDB.get(`search/movie?query=${searchQuery}`);
  const responseTV = await axiosTheMovieDB.get(`search/tv?query=${searchQuery}`);
  const data = [...response.data.results, ...responseTV.data.results];
  return data;
};

export const getMovieList = async (range: string, pageN: number): Promise<IData> => {
  const response = await axiosTheMovieDB.get(`movie/${range}`, {
    params: {
      page: pageN,
    },
  });
  // console.log(response.data);
  // return response.data.results as IMovie[];
  return response.data as IData;
};

export const getTVList = async (range: string, pageN: number): Promise<IData> => {
  const response = await axiosTheMovieDB.get(`tv/${range}`, {
    params: {
      page: pageN,
    },
  });
  // console.log(response.data);
  // return response.data.results as IMovie[];
  return response.data as IData;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await myBackendAxios.post(`auth/login/`, data);
  return response.data;
};

export const signupUser = async (data: { email: string; password: string }) => {
  const response = await myBackendAxios.post(`auth/register/`, data);
  // console.log(response.data.results);
  // console.log(response.data);
  return response.data;
};

export const logoutUser = async () => {
  await myBackendAxios.delete(`auth/logout/`);
};

export const getGoogleOAuthURL = async () => {
  const response = await myBackendAxios.get(`auth/get-oauth-url`);
  // console.log('response', response.data);
  return response.data.data.url;
};

export const signInGoogle = async (code: string) => {
  const response = await myBackendAxios.post('auth/confirm-google-auth', { code });
  // console.log('response', response.data);
  return response.data;
};

export const addFavoriteItem = async (data: IfavoriteItem) => {
  const response = await myBackendAxios.post('/favorite', data);
  return response.data;
};

export const removeFavoriteItem = async (data: removeFavoriteData) => {
  await myBackendAxios.delete('/favorite', { data });
  return data;
};

export const getFavoriteItems = async () => {
  const response = await myBackendAxios.get('/favorite');
  return response.data;
};

export const refreshAuthToken = async () => {
  const response = await myBackendAxios.post('/auth/refresh');
  return response;
};

export const reguestResetPass = async (data: { email: string }) => {
  const response = await myBackendAxios.post(`auth/request-reset-email`, data);
  return response.data;
};

export const ResetPass = async (token: string, data: { password: string }) => {
  const response = await myBackendAxios.post(`auth/reset-password?token=${token}`, data);
  return response.data;
};

export const updateUserAPI = async (data: FormData) => {
  const response = await myBackendAxios.patch('/user/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
