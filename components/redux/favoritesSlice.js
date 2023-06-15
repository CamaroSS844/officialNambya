import { createSlice } from "@reduxjs/toolkit";
import { save } from "./secureStore";



const initialState = {
    value: []
}
 
export const favoritesSlice = createSlice({
    name: 'fList',
    initialState,
    reducers: {
        initializeList: (state = [], action) => {
          state.value = action.payload
        }
        ,
        toggleFavorites: (state = [], action) => {
              state.value = ToggleFavorites(state, action.payload);
              // save('favorites', state.value);
          },
        clearAll: (state) => {
          state.value = []
          // save('favorites', state.value);
        }
    }
})

export const { toggleFavorites, clearAll, initializeList } = favoritesSlice.actions

export default favoritesSlice.reducer


const add = (arr, item) => [...arr, item];


const ToggleFavorites = ( state, item) => {
    let arr = state.value;
    let initialLength = arr.length

    arr = arr.filter(e =>  e.key !== item.key)

    if (initialLength === arr.length) {
      arr = add(arr, item);
    }
    // arr = Sort(arr);   reduce stored values
    return Sort(arr)
  };

  const Sort = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
      if (parseInt(list[i + 1].key) < parseInt(list[i].key)) {
        let temporalList = list[i];
        list[i] = list[i + 1];
        list[i + 1] = temporalList;
        Sort(list);
      }
    }
    return list;
  };