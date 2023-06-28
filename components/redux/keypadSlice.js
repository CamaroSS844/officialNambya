import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: false
}
 
export const keypadSlice = createSlice({
    name: 'keypadS',
    initialState,
    reducers: {
        setKeypadVisibility: (state = []) => {
            state.value = !state.value;
          },
    }
})

export const { setKeypadVisibility } = keypadSlice.actions

export default keypadSlice.reducer