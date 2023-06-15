import { createSlice } from "@reduxjs/toolkit";
import { save } from "./secureStore";

let fontSize = 'fontSize'


const initialState = {
    value: 20
}
 
export const fontSlice = createSlice({
    name: 'fontS',
    initialState,
    reducers: {
        increment: (state = 20) => {
                if (state.value<=28){//check for limit on app
                state.value += 1
                // save(fontSize, state.value);
                } else null
          },
        decrement: (state = 20) => {
            if (15<=state.value){
                state.value -= 1
                // save(fontSize, state.value);
            }else null
        },
    }
})

export const { increment, decrement } = fontSlice.actions

export default fontSlice.reducer
