import { IMovie } from '../../types/types';

interface MovieState {
  movie: {
    movieList: IMovie[];
    loading: boolean;
    error: string | null;
    trending: 'day' | 'week';
    random_Background: string | '';
  };
}

export const selectMovieList = (state: MovieState) => state.movie.movieList;
export const selectTrendingOption = (state: MovieState) => state.movie.trending;
export const selectLoading = (state: MovieState) => state.movie.loading;
export const selectRandom_BG = (state: MovieState) => state.movie.random_Background;
