import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice';
import localStorageMiddleware from './localStorageMiddleware';


export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch