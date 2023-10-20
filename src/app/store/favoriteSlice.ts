import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/store/store'
import type { TPerson } from '../../models/presonModel';

// Define a type for the slice state
interface favorites {
  favorites: Array<TPerson>
}
console.log(localStorage.getItem('favorites'))
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

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.favorites.favorites;

export default favoriteSlice.reducer