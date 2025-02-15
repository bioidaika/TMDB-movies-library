import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getGoogleOAuthUrlOP,
  loginUserOP,
  logoutUserOP,
  refreshPage,
  signinGoogleOauthOP,
  signinUserOP,
} from './operations';

export interface authState {
  token: string | null;
  isLoading: boolean | null;
  isLoggedIn: boolean | null;
  isRefreshing: boolean;
  error: string | null;
}
export const initialState: authState = {
  token: null,
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
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserOP.pending, handleServerPending)
      .addCase(loginUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(loginUserOP.rejected, handleServerRejected)
      .addCase(logoutUserOP.pending, handleServerPending)
      .addCase(logoutUserOP.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logoutUserOP.rejected, handleServerRejected)
      .addCase(signinUserOP.pending, handleServerPending)
      .addCase(signinUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(signinUserOP.rejected, handleServerRejected)
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
        state.token = action.payload;
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
export const authReducer = authSlice.reducer;
