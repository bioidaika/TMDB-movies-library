import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { movieReducer } from './movie/slice';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { setupAxiosInterceptors } from './auth/operations';

const movieConfig = {
  key: 'movie',
  storage,
  whitelist: ['favouriteList'],
};
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistorMovieReducer = persistReducer(movieConfig, movieReducer);
const persistorAuthReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: {
    movie: persistorMovieReducer,
    auth: persistorAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
