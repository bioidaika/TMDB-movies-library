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

const movieConfig = {
  key: 'movie',
  storage,
  whitelist: ['favouriteList'],
};

const persistorMovieReducer = persistReducer(movieConfig, movieReducer);

export const store = configureStore({
  reducer: {
    movie: persistorMovieReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
