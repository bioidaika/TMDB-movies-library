import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../../components/api';

interface LoginData {
  email: string;
  password: string;
}

export const loginUserOP = createAsyncThunk('auth/login', async (data: LoginData, thunkAPI) => {
  try {
    const response = await loginUser(data);
    if (response) {
      return response as LoginData;
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
    // if (response) {
    //   return response as { message: string };
    // } else {
    //   return thunkAPI.rejectWithValue('No data available');
    // }
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
