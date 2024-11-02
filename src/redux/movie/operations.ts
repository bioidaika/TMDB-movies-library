import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMovieByID,
  getMovieList,
  getTrendingMovies,
  getTvByID,
  getTVList,
  searchMovieQuery,
} from '../../components/api';
import { IData, IDataTV, IMovie, IMovieByID, ITVByID } from '../../types/types';

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

export const getMovieListByParam = createAsyncThunk<IData, { range: string; pageN: number }>(
  'movie/category',
  async ({ range, pageN }, thunkAPI) => {
    try {
      const response = await getMovieList(range, pageN);
      if (response) {
        return response as IData;
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

export const getTVShowByParam = createAsyncThunk<IDataTV, { range: string; pageN: number }>(
  'tv/category',
  async ({ range, pageN }, thunkAPI) => {
    try {
      const response = await getTVList(range, pageN);
      if (response) {
        return response as IDataTV;
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

export const getSelectedTvByID = createAsyncThunk<ITVByID, string>(
  'tv/byID',
  async (option, thunkAPI) => {
    try {
      const response = await getTvByID(option);
      if (response) {
        return response as ITVByID;
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
