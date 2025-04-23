import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCastsMovieOP,
  getCastsTVOP,
  getMovieListByParam,
  getReviewsMovieOP,
  getReviewsTVOP,
  getSelectedMovieByID,
  getSelectedTvByID,
  getTrendingMovieList,
  getTVShowByParam,
  searchMovieReq,
} from './operations';
import { ICast, IData, IMovie, IMovieByID, IReviews, ITVByID } from '../../types/types';

export interface MovieState {
  movieList: IMovie[];
  loading: boolean;
  error: string | null;
  trending: 'day' | 'week';
  movieParam: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'airing_today' | 'on_the_air';
  random_Background: string | '';
  selectedMovie: IMovieByID | null;
  selectedTV: ITVByID | null;
  selectedCast: ICast[];
  selectedReviews: IReviews[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export const initialState: MovieState = {
  movieList: [],
  loading: false,
  error: null,
  trending: 'day',
  movieParam: 'now_playing',
  random_Background: '',
  selectedMovie: null,
  selectedTV: null,
  selectedCast: [],
  selectedReviews: [],
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
        state.random_Background = action.payload[randomNumber].backdrop_path;
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
        state.selectedTV = null;
      })
      .addCase(getSelectedMovieByID.rejected, handleRejected)
      .addCase(getMovieListByParam.pending, handlePending)
      .addCase(getMovieListByParam.fulfilled, (state, action: PayloadAction<IData>) => {
        state.movieList = action.payload.results;
        //limit for pages = 500 themoviedb API
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        action.payload.total_pages >= 500
          ? (state.totalPages = 500)
          : (state.totalPages = action.payload.total_pages);
        state.totalResults = action.payload.total_results;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(getMovieListByParam.rejected, handleRejected)
      .addCase(getTVShowByParam.pending, handlePending)
      .addCase(getTVShowByParam.fulfilled, (state, action: PayloadAction<IData>) => {
        state.movieList = action.payload.results;
        //limit for pages = 500 themoviedb API
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        action.payload.total_pages >= 500
          ? (state.totalPages = 500)
          : (state.totalPages = action.payload.total_pages);
        state.totalResults = action.payload.total_results;
        state.selectedTV = null;
        state.loading = false;
      })
      .addCase(getTVShowByParam.rejected, handleRejected)
      .addCase(getSelectedTvByID.pending, handlePending)
      .addCase(getSelectedTvByID.fulfilled, (state, action: PayloadAction<ITVByID>) => {
        state.selectedTV = action.payload;
        state.loading = false;
        state.selectedMovie = null;
      })
      .addCase(getSelectedTvByID.rejected, handleRejected)
      .addCase(getReviewsMovieOP.pending, handlePending)
      .addCase(getReviewsMovieOP.fulfilled, (state, action: PayloadAction<IReviews[]>) => {
        state.selectedReviews = action.payload;
        state.loading = false;
      })
      .addCase(getReviewsTVOP.pending, handlePending)
      .addCase(getReviewsTVOP.fulfilled, (state, action: PayloadAction<IReviews[]>) => {
        state.selectedReviews = action.payload;
        state.loading = false;
      })
      .addCase(getCastsMovieOP.pending, handlePending)
      .addCase(getCastsMovieOP.fulfilled, (state, action: PayloadAction<ICast[]>) => {
        state.selectedCast = action.payload;
        state.loading = false;
      })
      .addCase(getCastsTVOP.pending, handlePending)
      .addCase(getCastsTVOP.fulfilled, (state, action: PayloadAction<ICast[]>) => {
        state.selectedCast = action.payload;
        state.loading = false;
      });
  },
});
export const { setMovieList, setTrendingOption, setRandomBackground, setMovieParam, setPage } =
  movieSlice.actions;
export const movieReducer = movieSlice.reducer;
