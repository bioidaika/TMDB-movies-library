import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFavoriteItem,
  getFavoriteItems,
  getGoogleOAuthURL,
  loginUser,
  logoutUser,
  myBackendAxios,
  removeFavoriteItem,
  signInGoogle,
  signupUser,
  refreshAuthToken,
  reguestResetPass,
  ResetPass,
} from '../api/api';
import { RootState } from '../store';
import { logoutAction, setAccessToken } from './slice';
import { Store } from '@reduxjs/toolkit';
import { ICredentials, IfavoriteItem, removeFavoriteData } from '../../types/types';

export const setAuthHeader = (token: string) => {
  myBackendAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  myBackendAxios.defaults.headers.common.Authorization = '';
};

export const loginUserOP = createAsyncThunk('auth/login', async (data: ICredentials, thunkAPI) => {
  try {
    const response = await loginUser(data);
    if (response) {
      setAuthHeader(response.data.accessToken);
      return response.data;
    } else {
      return thunkAPI.rejectWithValue('No data available');
    }
  } catch (error) {
    if (error instanceof Error && 'response' in error)
      return thunkAPI.rejectWithValue(
        (error as { response: { data: { error: string } } }).response.data.error
      );
    else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const requestResetPasswordOP = createAsyncThunk(
  'auth/requestResetPassword',
  async (data: { email: string }, thunkAPI) => {
    try {
      const response = await reguestResetPass(data);
      return response.message;
    } catch (error) {
      if (error instanceof Error && 'response' in error)
        return thunkAPI.rejectWithValue(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const resetPasswordOP = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }: { token: string; password: string }, thunkAPI) => {
    try {
      const response = await ResetPass(token, { password });
      return response.data;
    } catch (error) {
      if (error instanceof Error && 'response' in error)
        return thunkAPI.rejectWithValue(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const logoutUserOP = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutUser();
    clearAuthHeader();
  } catch (error) {
    if (error instanceof Error && 'response' in error)
      return thunkAPI.rejectWithValue(
        (error as { response: { data: { error: string } } }).response.data.error
      );
    else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const signupUserOP = createAsyncThunk(
  'auth/signup',
  async (data: ICredentials, thunkAPI) => {
    try {
      const response = await signupUser(data);
      if (response) {
        setAuthHeader(response.data.accessToken);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error && 'response' in error)
        return thunkAPI.rejectWithValue(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const getGoogleOAuthUrlOP = createAsyncThunk(
  'auth/getGoogleOAuthURL',
  async (_, thunkAPI) => {
    try {
      const response = await getGoogleOAuthURL();
      if (response) {
        // window.open(response, '_self');
        window.location.href = response;
        return response;
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error && 'response' in error)
        return thunkAPI.rejectWithValue(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const signinGoogleOauthOP = createAsyncThunk(
  'auth/confirmGoogleOAuth',
  async (code: string, thunkAPI) => {
    try {
      const response = await signInGoogle(code);
      if (response) {
        setAuthHeader(response.data.accessToken);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      if (error instanceof Error && 'response' in error)
        return thunkAPI.rejectWithValue(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const refreshPage = createAsyncThunk('user/favorite', async (_, thunkAPI) => {
  const state = <RootState>thunkAPI.getState();
  const token = state.auth.token;
  if (token === null) return thunkAPI.rejectWithValue('No token available');
  try {
    setAuthHeader(token);
    const favorites = await getFavoriteItems();
    return favorites.data as IfavoriteItem[];
  } catch {
    return thunkAPI.rejectWithValue('Session expired or cookies are missing. Please login again');
  }
});

export const setupAxiosInterceptors = (store: Store) => {
  myBackendAxios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const sessionId = document.cookie.split('; ').find(row => row.startsWith('sessionId='));
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('refreshToken='));
        if (!sessionId || !refreshToken) {
          console.warn('Session expired or cookies are missing. Logging out...');
          store.dispatch(logoutAction());
          return Promise.reject(error);
        }

        try {
          console.log('0');
          // const { data } = await myBackendAxios.post('auth/refresh');
          const { data } = await refreshAuthToken(); // returns only data = data.data.accessToken
          console.log('accessToken', data.data.accessToken);
          setAuthHeader(data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          store.dispatch(setAccessToken(data.data.accessToken));
          console.log('1');
          return myBackendAxios(originalRequest);
        } catch (err) {
          store.dispatch(logoutAction());
          return Promise.reject(err);
        }
      }
      console.log('3');
      return Promise.reject(error);
    }
  );
};

export const addFavorite = createAsyncThunk<IfavoriteItem, IfavoriteItem>(
  'user/addFavorite',
  async (data: IfavoriteItem, thunkAPI) => {
    try {
      const response = await addFavoriteItem(data);
      return response.data as IfavoriteItem;
    } catch {
      return thunkAPI.rejectWithValue('An unknown error occurred!!!');
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'user/removeFavorite',
  async (data: removeFavoriteData, thunkAPI) => {
    try {
      await removeFavoriteItem(data);
      return data;
    } catch {
      return thunkAPI.rejectWithValue('An unknown error occurred during remove fav!!!');
    }
  }
);
