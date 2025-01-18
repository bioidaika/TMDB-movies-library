import { Auth } from '../../types/types';

export const isLoggedIn = (state: Auth) => state.auth.isLoggedIn;
export const isLoading = (state: Auth) => state.auth.isLoading;
export const isError = (state: Auth) => state.auth.error;
