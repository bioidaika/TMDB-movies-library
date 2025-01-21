import { Auth } from '../../types/types';

export const selectIsLoggedIn = (state: Auth) => state.auth.isLoggedIn;
export const selectIsLoading = (state: Auth) => state.auth.isLoading;
export const selectIsError = (state: Auth) => state.auth.error;
export const selectIsRefreshing = (state: Auth) => state.auth.isRefreshing;
