import { createSlice } from "@reduxjs/toolkit";
import { StyleSheet } from "react-native";
// import { save } from "./secureStore";

let styles = StyleSheet.create({
    light: {
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'gray',
      placeholderColor: 'gray',
      tabBackgroundHeader:  '#210070',
      tabBackgroundcolor: 'white',
      tabIcon: '#0be0e0',
      tabIconInactive: '#0be0e0',
      statusbar:  "#210070",
      homeHeaderBackground: '#210070',
      appHeaderBackground: '#210070'
    },
    dark: {
      backgroundColor: '#1f1f1f',
      color: 'white',
      borderColor: 'white',
      placeholderColor: 'white',
      tabBackgroundHeader:  'black',
      tabBackgroundcolor: 'black',
      tabIcon: 'white',
      tabIconInactive: 'gray',
      statusbar:  "black",
      homeHeaderBackground: 'black',
      appHeaderBackground: 'black',
    }})

const initialState = {
    //true means dark mode is on
    value: styles.light
}
 
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state={}, action) => {
          //for general text and background
          //true means dark mode is on
          if (action.payload === styles.light){
            state.value = styles.dark
          }else {
            state.value = styles.light
           }
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer

//themes

