import AsyncStorage from "@react-native-async-storage/async-storage";

export const favoriteslist = 'favoriteslist';
export const fontsize = 'fontsize';
export const theme  = 'theme';

//storing an object value
export const storeData = async (id, value) => {
  if (id === favoriteslist){
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(favoriteslist, jsonValue)
    } catch (e) {
      // saving error
    }} else if (id === theme){
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(theme, jsonValue)
      } catch (e) {
        // saving error
      }}else if (id === fontsize){
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(fontsize, jsonValue)
        } catch (e) {
          // saving error
        }}
  }

//reading object value
export const getData = async (id) => {
    if (id === favoriteslist){
      try {
        const jsonValue = await AsyncStorage.getItem(favoriteslist)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // saving error
      }} else if (id === theme){
        try {
          const jsonValue = await AsyncStorage.getItem(theme)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // saving error
        }}else if (id === fontsize){
          try {
            const jsonValue = await AsyncStorage.getItem(fontsize)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch (e) {
            // saving error
          }}
  }

/*
// import * as secureStore from 'expo-secure-store'

// //permanent store
// export async function save(key, value){ 
//     await secureStore.setItemAsync(key, JSON.stringify({value: value}))
// }

// export async function getValueFor(key){
//     let result = await secureStore.getItemAsync(key)
//     if (result){
//         result = JSON.parse(result)
//         return result.value
//     } else {
//         return null
//     }

// }

// export async function initialize(key){
//     value =  await getValueFor(key)
//     if (value){
//       return value
//     }
//   }
*/
