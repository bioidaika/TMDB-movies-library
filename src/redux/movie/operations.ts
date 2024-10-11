import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMovieByID,
  getMovieList,
  getTrendingMovies,
  searchMovieQuery,
} from '../../components/api';
import { IMovie, IMovieByID } from '../../types/types';

export const getTrendingMovieList = createAsyncThunk<IMovie[], string>(
  'movie/trending-movies',
  async (option, thunkAPI) => {
    try {
      const response = await getTrendingMovies(option);
      if (response) {
        return response as IMovie[];
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const getMovieListByParam = createAsyncThunk<IMovie[], string>(
  'movie/category',
  async (option, thunkAPI) => {
    try {
      const response = await getMovieList(option);
      if (response) {
        return response as IMovie[];
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const getSelectedMovieByID = createAsyncThunk<IMovieByID, string>(
  'movie/byID',
  async (option, thunkAPI) => {
    try {
      const response = await getMovieByID(option);
      if (response) {
        return response as IMovieByID;
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const searchMovieReq = createAsyncThunk<IMovie[], string>(
  'movie/search',
  async (option, thunkAPI) => {
    try {
      const response = await searchMovieQuery(option);
      if (response) {
        return response as IMovie[];
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);
