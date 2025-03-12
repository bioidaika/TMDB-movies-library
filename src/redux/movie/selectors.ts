import { Movie } from '../../types/types';

export const selectMovieList = (state: Movie) => state.movie.movieList;
export const selectTVList = (state: Movie) => state.movie.tvList;
export const selectTrendingOption = (state: Movie) => state.movie.trending;
export const selectLoading = (state: Movie) => state.movie.loading;
export const selectRandom_BG = (state: Movie) => state.movie.random_Background;
export const selectSelectedMovie = (state: Movie) => state.movie.selectedMovie;
export const selectSelectedTV = (state: Movie) => state.movie.selectedTV;
export const selectError = (state: Movie) => state.movie.error;
export const selectMovieParam = (state: Movie) => state.movie.movieParam;
export const selectCurrentPage = (state: Movie) => state.movie.currentPage;
export const selectTotalPages = (state: Movie) => state.movie.totalPages;
export const selectSelectedReviews = (state: Movie) => state.movie.selectedReviews;
export const selectSelectedCast = (state: Movie) => state.movie.selectedCast;
