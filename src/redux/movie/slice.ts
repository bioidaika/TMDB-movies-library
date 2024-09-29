import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { getMovieList, searchMovieReq } from './operations';
import { IMovie } from '../../types/types';

interface MovieState {
  movieList: IMovie[];
  loading: boolean;
  error: string | null;
  trending: 'day' | 'week';
  random_Background: string | '';
}

export const initialState: MovieState = {
  movieList: [],
  loading: false,
  error: null,
  trending: 'day',
  random_Background: '',
};

const handlePending = (state: MovieState) => {
  state.loading = true;
};

const handleRejected = (state: MovieState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = (action.payload as { message?: string })?.message || 'An error occurred';
};

const randomNumber = Math.floor(Math.random() * 19);

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    setMovieList(state, action) {
      state.movieList = action.payload;
    },
    setTrendingOption(state, action) {
      state.trending = action.payload;
    },
    setRandomBackground(state, action) {
      state.random_Background = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMovieList.pending, handlePending)
      .addCase(getMovieList.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.random_Background
          ? ''
          : (state.random_Background = action.payload[randomNumber].backdrop_path);
        state.loading = false;
        // console.log('Finished GetMovieList');
      })
      .addCase(getMovieList.rejected, handleRejected)
      .addCase(searchMovieReq.pending, handlePending)
      .addCase(searchMovieReq.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.loading = false;
        // console.log('Finished Search');
      })
      .addCase(searchMovieReq.rejected, handleRejected);
  },
});
export const { setMovieList, setTrendingOption, setRandomBackground } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
