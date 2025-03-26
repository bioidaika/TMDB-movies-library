import { Auth } from '../../types/types';

export const selectIsLoggedIn = (state: Auth) => state.auth.isLoggedIn;
export const selectIsLoading = (state: Auth) => state.auth.isLoading;
export const selectIsError = (state: Auth) => state.auth.error;
export const selectToken = (state: Auth) => state.auth.token;
export const selectUserName = (state: Auth) => state.auth.user?.name;
export const selectFavorite = (state: Auth) => state.auth.favorites;
export const selectRequestResetPassword = (state: Auth) => state.auth.requestResetPassword;
export const selectEmailReset = (state: Auth) => state.auth.emailReset;
export const selectPasswordChanged = (state: Auth) => state.auth.passwordChanged;
