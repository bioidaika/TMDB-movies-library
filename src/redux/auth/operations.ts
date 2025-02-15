import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGoogleOAuthURL,
  loginUser,
  logoutUser,
  myBackendAxios,
  signInGoogle,
  signupUser,
} from '../../components/api';
import { RootState } from '../store';
import { setAccessToken } from './slice';
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
      return response.data.accessToken;
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
        setAuthHeader(response.data.accessToken);
        return response.data.accessToken;
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
        return response.data.accessToken;
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

export const refreshPage = createAsyncThunk('auth/refreshPage', async (_, thunkAPI) => {
  const state = <RootState>thunkAPI.getState();
  const token = state.auth.token;
  if (token === null) return thunkAPI.rejectWithValue('No token available');

  try {
    setAuthHeader(token);
    await myBackendAxios.get('/favorite');
    return token;
  } catch {
    return thunkAPI.rejectWithValue('An unknown error occurred!!!');
  }
});

export const setupAxiosInterceptors = store => {
  myBackendAxios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log('0');
          // await myBackendAxios.post('auth/refresh');
          const { data } = await myBackendAxios.post('auth/refresh', null, {
            withCredentials: true,
          });
          setAuthHeader(data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          store.dispatch(setAccessToken(data.accessToken));
          console.log('1');
          return myBackendAxios(originalRequest);
          //return axios.request(originalRequest);
        } catch (err) {
          console.log('2');
          store.dispatch(logoutUserOP());
          // logoutUserOP();
          return Promise.reject(err);
        }
      }
      console.log('3');
      return Promise.reject(error);
    }
  );
};
export const refreshTokenOP = createAsyncThunk('auth/refresh', async () => {
  try {
    console.log('3');
    const response = await myBackendAxios.post('/auth/refresh', {}, { withCredentials: true });
    const newAccessToken = response.data.data.accessToken;
    console.log('newAccessToken', newAccessToken);
    return newAccessToken;
  } catch {
    // dispatch(logoutUserOP());
  }
});
