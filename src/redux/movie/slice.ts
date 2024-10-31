import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getMovieListByParam,
  getSelectedMovieByID,
  getTrendingMovieList,
  getTVShowByParam,
  searchMovieReq,
} from './operations';
import { IData, IDataTV, IMovie, IMovieByID, ITVShow } from '../../types/types';

export interface MovieState {
  movieList: IMovie[];
  tvList: ITVShow[];
  loading: boolean;
  error: string | null;
  trending: 'day' | 'week';
  movieParam: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'airing_today' | 'on_the_air';
  // tvShowParam: 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';
  random_Background: string | '';
  selectedMovie: IMovieByID | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export const initialState: MovieState = {
  movieList: [],
  tvList: [],
  loading: false,
  error: null,
  trending: 'week',
  // tvShowParam: 'airing_today',
  movieParam: 'now_playing',
  random_Background: '',
  selectedMovie: null,
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
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
    setMovieParam(state, action) {
      state.movieParam = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTrendingMovieList.pending, handlePending)
      .addCase(getTrendingMovieList.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.selectedMovie = null;
        state.random_Background == ''
          ? (state.random_Background = action.payload[randomNumber].backdrop_path)
          : (state.random_Background = state.random_Background);

        state.loading = false;
      })
      .addCase(getTrendingMovieList.rejected, handleRejected)
      .addCase(searchMovieReq.pending, handlePending)
      .addCase(searchMovieReq.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(searchMovieReq.rejected, handleRejected)
      .addCase(getSelectedMovieByID.pending, handlePending)
      .addCase(getSelectedMovieByID.fulfilled, (state, action: PayloadAction<IMovieByID>) => {
        state.selectedMovie = action.payload;
        state.loading = false;
      })
      .addCase(getSelectedMovieByID.rejected, handleRejected)
      .addCase(getMovieListByParam.pending, handlePending)
      .addCase(getMovieListByParam.fulfilled, (state, action: PayloadAction<IData>) => {
        state.movieList = action.payload.results;
        //limit for pages = 500 themoviedb API
        action.payload.total_pages >= 500
          ? (state.totalPages = 500)
          : (state.totalPages = action.payload.total_pages);
        state.totalResults = action.payload.total_results;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(getMovieListByParam.rejected, handleRejected)
      .addCase(getTVShowByParam.pending, handlePending)
      .addCase(getTVShowByParam.fulfilled, (state, action: PayloadAction<IDataTV>) => {
        state.tvList = action.payload.results;
        //limit for pages = 500 themoviedb API
        action.payload.total_pages >= 500
          ? (state.totalPages = 500)
          : (state.totalPages = action.payload.total_pages);
        state.totalResults = action.payload.total_results;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(getTVShowByParam.rejected, handleRejected);
  },
});
export const { setMovieList, setTrendingOption, setRandomBackground, setMovieParam, setPage } =
  movieSlice.actions;
export const movieReducer = movieSlice.reducer;
