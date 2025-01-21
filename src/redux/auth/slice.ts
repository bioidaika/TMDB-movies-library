import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUserOP } from './operations';

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUserOP.pending, handleServerPending)
      .addCase(loginUserOP.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUserOP.rejected, handleServerRejected);
  },
});

export const authReducer = authSlice.reducer;
