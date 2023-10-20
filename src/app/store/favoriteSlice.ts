import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TPerson } from '../../models/presonModel';

// Define a type for the slice state
interface favorites {
  favorites: Array<TPerson>
}
const getFavoritesFromLocalStorage = (): TPerson[] => {
  const favorites = localStorage.getItem('favorites')
  if (favorites !== null) return JSON.parse(favorites)
  return [];
}
const initialState: favorites = {
  favorites: getFavoritesFromLocalStorage(),
}

export const favoriteSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFavoritePerson: (state, action: PayloadAction<TPerson>) => {
      const personIndex = state.favorites.find(item => item.name === action.payload.name);
      if (personIndex) return state;
      state.favorites.push(action.payload);
      return state;
    },
    removeFavoritePerson: (state, action: PayloadAction<TPerson>) => {
      state.favorites = state.favorites.filter(item => item.name !== action.payload.name);
      return state;
    },
  },
})

export const {
  addFavoritePerson,
  removeFavoritePerson,
} = favoriteSlice.actions

export default favoriteSlice.reducer