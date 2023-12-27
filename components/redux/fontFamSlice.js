import { createSlice } from "@reduxjs/toolkit";
// import { storeData, line  } from "./secureStore";
//to link with permanent store


// Inter_500Medium,
//   RobotoCondensed_400Regular,
//   SourceSansPro_400Regular,
//   PlayfairDisplaySC_400Regular

const initialState = {
    value: 'SourceSansPro_400Regular'
}
 
export const fontFamSlice = createSlice({
    name: 'fontFam',
    initialState,
    reducers: {
        // initializeLineHeight: (state = [], action) => {
        //     state.value = action.payload
        //   },
        setfontFam: (state='SourceSans', action) => {
            // storeData(fontsize, state.value);
            switch(action.payload){
                case 'SourceSans':
                    state.value = 'SourceSansPro_400Regular';
                    break;
                case 'Roboto':
                    state.value = 'RobotoCondensed_400Regular';
                    break;
                case 'Playfair':
                    state.value = 'PlayfairDisplaySC_400Regular';
                    break;
                case 'Inter':
                    state.value = 'Inter_500Medium';
                    break;
                default:
                    state.value = 'SourceSansPro_400Regular';
            }
        }
    }
})

export const { setfontFam } = fontFamSlice.actions

export default fontFamSlice.reducer