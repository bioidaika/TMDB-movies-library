import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getGoogleOAuthUrlOP,
  loginUserOP,
  logoutUserOP,
  refreshPage,
  signinGoogleOauthOP,
  signupUserOP,
} from './operations';
export interface user {
  _id: string | null;
  name: string | null;
  email: string | null;
  gender: string | null;
  avatar: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface favorite {
  backdrop_path: string | null;
  genres: Array<number> | null;
  id: number | null;
  original_title: string | null;
  overview: string | null;
  poster_path: string | null;
  release_date: string | null;
  title: string | null;
  vote_average: number | null;
  vote_count: number | null;
  contentType: string | null;
  userId: string | null;
}

export interface authState {
  token: string | null;
  user: user | null;
  favorites: favorite[] | null;
  isLoading: boolean | null;
  isLoggedIn: boolean | null;
  isRefreshing: boolean;
  error: string | null;
}
export const initialState: authState = {
  token: null,
  user: null,
  favorites: null,
  isLoading: null,
  isLoggedIn: null,
  isRefreshing: false,
  error: null,
};

export interface tokenType {
  accessToken: string;
}

const handleServerPending = (state: authState) => {
  state.isLoading = true;
  state.error = null;
};

const handleServerRejected = (state: authState, action: PayloadAction<string | unknown>) => {
  state.isLoading = false;
  // state.error = (action.payload as { message?: string })?.message || 'An error occurred';
  state.error = (action.payload as string) || 'An error occurred';
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logoutAction(state) {
      // state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserOP.pending, handleServerPending)
      .addCase(loginUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(loginUserOP.rejected, handleServerRejected)
      .addCase(logoutUserOP.pending, handleServerPending)
      .addCase(logoutUserOP.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logoutUserOP.rejected, handleServerRejected)
      .addCase(signupUserOP.pending, handleServerPending)
      .addCase(signupUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(signupUserOP.rejected, handleServerRejected)
      .addCase(refreshPage.pending, handleServerPending)
      .addCase(refreshPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(refreshPage.rejected, handleServerRejected)
      .addCase(signinGoogleOauthOP.pending, handleServerPending)
      .addCase(signinGoogleOauthOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(signinGoogleOauthOP.rejected, handleServerRejected)
      .addCase(getGoogleOAuthUrlOP.pending, handleServerPending)
      .addCase(getGoogleOAuthUrlOP.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getGoogleOAuthUrlOP.rejected, handleServerRejected);
    // .addCase(refreshTokenOP.pending, handleServerPending)
    // .addCase(refreshTokenOP.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.token = action.payload;
    // })
    // .addCase(refreshTokenOP.rejected, handleServerRejected)
  },
});

export const setError = authSlice.actions.setError;
export const setAccessToken = authSlice.actions.setAccessToken;
export const logoutAction = authSlice.actions.logoutAction;
export const authReducer = authSlice.reducer;
