import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import HymnScreen from './components/HymnScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';

//MakerCulture17!
const Stack = createNativeStackNavigator()

export default function App() {
  
  return(
    <NavigationContainer>
      <Provider store={store}>
          <MyNavigator />
      </Provider>
    </NavigationContainer>
  );
}

function MyNavigator(){
  let background = useSelector(state => state.theme.value.homeHeaderBackground)
  return (
    <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: background
            },
            headerTintColor: '#e6e5e5'
          }}
          >
            <Stack.Screen
             name='HOME'
             component={HomeScreen}
             options={{headerShown: false}}
             />
            <Stack.Screen name='Hymn' component={HymnScreen} options={{headerShown: false, gestureEnabled: true}} />
          </Stack.Navigator>
  )
}