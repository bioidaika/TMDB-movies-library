import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { getMovieList } from './operations';
import { IMovie } from '../../types/types';

interface MovieState {
  movieList: IMovie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  movieList: [],
  loading: false,
  error: null,
};

const handlePending = (state: MovieState) => {
  state.loading = true;
};

const handleRejected = (state: MovieState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = (action.payload as { message?: string })?.message || 'An error occurred';
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    setMovieList(state, action) {
      state.movieList = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMovieList.pending, handlePending)
      .addCase(getMovieList.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.loading = false;
      })
      .addCase(getMovieList.rejected, handleRejected);
  },
});
export const { setMovieList } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
