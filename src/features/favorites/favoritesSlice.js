import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem("gotogether-favorites");

    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);

      if (Array.isArray(parsedFavorites)) {
        return parsedFavorites;
      }
    }

    return [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    favorites: loadFavorites(),
  },

  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.some(
        (activity) => activity.id === action.payload.id
      );

      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (activity) => activity.id !== action.payload
      );
    },

    updateFavorite: (state, action) => {
      state.favorites = state.favorites.map((activity) =>
        activity.id === action.payload.id
          ? action.payload
          : activity
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  updateFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;