import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGoogleOAuthURL,
  loginUser,
  logoutUser,
  myBackendAxios,
  signupUser,
} from '../../components/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}
export const setAuthHeader = (token: string) => {
  myBackendAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  myBackendAxios.defaults.headers.common.Authorization = '';
};

export const loginUserOP = createAsyncThunk('auth/login', async (data: LoginData, thunkAPI) => {
  try {
    const response = await loginUser(data);
    if (response) {
      setAuthHeader(response.data.accessToken);
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

export const signinUserOP = createAsyncThunk(
  'auth/signup',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await signupUser(data);
      if (response) {
        return response as RegisterData;
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
      const response = await myBackendAxios.post('auth/confirm-google-auth', { code });
      if (response) {
        setAuthHeader(response.data.accessToken);
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
