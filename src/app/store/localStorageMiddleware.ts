import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = store => next=> action => {
  next(action); // Пропустить действие через middleware
  localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.favorites));
};

export default localStorageMiddleware;