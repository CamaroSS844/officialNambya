
import * as secureStore from 'expo-secure-store'

//permanent store
export async function save(key, value){ 
    await secureStore.setItemAsync(key, JSON.stringify({value: value}))
}

export async function getValueFor(key){
    let result = await secureStore.getItemAsync(key)
    if (result){
        result = JSON.parse(result)
        return result.value
    } else {
        return null
    }

}

export async function initialize(key){
    value =  await getValueFor(key)
    if (value){
      return value
    }
  }
