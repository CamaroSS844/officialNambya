import { createSlice } from "@reduxjs/toolkit";
import { storeData, theme } from "./secureStore";

let object = {
    light: {
      backgroundColor: '#FEFEFE',
      color: 'black',
      borderColor: 'gray',
      placeholderColor: '#fefefed1',
      tabBackgroundHeader:  '#990909',
      tabBackgroundcolor: 'white',
      tabIcon: 'red',
      statusbar:  "#850909",
      homeHeaderBackground: '#a60606',
      appHeaderBackground: '#ae0a0a',
      textinput: '#b74444'
    },
    dark: {
      backgroundColor: '#292828',
      color: '#FEFEFE',
      borderColor: '#FEFEFE',
      placeholderColor: '#FEFEFE',
      tabBackgroundHeader:  '#292828',
      tabBackgroundcolor: '#292828',
      tabIcon: '#FEFEFE',
      statusbar:  "#292828",
      homeHeaderBackground: '#292828',
      appHeaderBackground: '#292828',
      textinput: '#383838'
    }}

const initialState = {
    //true means dark mode is on
    value: object.light
}
 
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      initializeTheme: (state = [], action) => {
        state.value = action.payload
      },
        toggleTheme: (state={}, action) => {
          //for general text and background
          //true means dark mode is on
          if (action.payload === object.light){
            state.value = object.dark
            storeData(theme, state.value)
          }else {
            state.value = object.light
            storeData(theme, state.value)
           }
        }
    }
})

export const currentTheme = (themeColor) => {
  //we will use theme.color to establish if it is light or dark
  if (themeColor == object.light.color){
    return true
  } 
  return false
}

export const { toggleTheme, initializeTheme } = themeSlice.actions

export default themeSlice.reducer