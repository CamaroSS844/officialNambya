import { createSlice } from "@reduxjs/toolkit";
import { storeData, fontsize  } from "./secureStore";


const initialState = {
    value: 18
}
 
export const fontSlice = createSlice({
    name: 'fontS',
    initialState,
    reducers: {
        initializeSize: (state = [], action) => {
            state.value = action.payload
          },
        increment: (state = 20) => {
                if (state.value<=28){//check for limit on app
                state.value += 1
                storeData(fontsize, state.value)
                } else null
          },
        decrement: (state = 20) => {
            if (15<=state.value){
                state.value -= 1
                storeData(fontsize, state.value)
            }else null
        },
    }
})

export const { increment, decrement, initializeSize } = fontSlice.actions

export default fontSlice.reducer