import { createSlice } from "@reduxjs/toolkit";
// import { storeData, line  } from "./secureStore";
//to link with permanent store



const initialState = {
    value: 25//30 35
}
 
export const lineSpacing = createSlice({
    name: 'lineSpace',
    initialState,
    reducers: {
        initializeLineHeight: (state = [], action) => {
            state.value = action.payload
          },
        setLineHeight: (state=20, action) => {
            // storeData(fontsize, state.value);
            state.value = parseInt(action.payload);
        }
    }
})

export const { setLineHeight, initializeLineHeight } = lineSpacing.actions

export default lineSpacing.reducer