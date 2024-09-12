import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendingMoviesDay } from '../../components/api';
import { IMovie } from '../../types/types';

export const getMovieList = createAsyncThunk<IMovie[], void>(
  'movie/trending-movies',
  async (_, thunkAPI) => {
    try {
      const response = await getTrendingMoviesDay();
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
