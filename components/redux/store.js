import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import fontReducer from './fontSlice'
import linespaceSlice from "./linespaceSlice";
import toggleBSSlice from "./toggleBSSlice";
import  toggleTheme  from "./themeSlice";
import keypadSlice from "./keypadSlice";

export const store = configureStore({
    reducer: {
        fList: favoritesReducer,
        fontS: fontReducer,
        theme: toggleTheme,
        LineSpace: linespaceSlice,
        toggleBS: toggleBSSlice,
        keypadS: keypadSlice
    }
}) 

