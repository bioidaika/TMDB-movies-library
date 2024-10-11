import { MovieState } from '../../types/types';

export const selectMovieList = (state: MovieState) => state.movie.movieList;
export const selectTrendingOption = (state: MovieState) => state.movie.trending;
export const selectLoading = (state: MovieState) => state.movie.loading;
export const selectRandom_BG = (state: MovieState) => state.movie.random_Background;
export const selectSelectedMovie = (state: MovieState) => state.movie.selectedMovie;
export const selectError = (state: MovieState) => state.movie.error;
export const selectMovieParam = (state: MovieState) => state.movie.movieParam;
