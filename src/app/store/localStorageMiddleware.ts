import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = store => next=> action => {
  next(action);
  localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.favorites));
};

export default localStorageMiddleware;