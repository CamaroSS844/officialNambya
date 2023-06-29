import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import HymnScreen from './components/HymnScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import  EditHymn  from './components/hymnActionBar/edit';

//MakerCulture17!
const Stack = createNativeStackNavigator()

export default function App() {
  
  return(
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <Provider store={store}>
          <MyNavigator />
      </Provider>
    </NavigationContainer>
    </GestureHandlerRootView>
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
            headerTintColor: '#e6e5e5',
            detachInactiveScreens: true
          }}
          >
            <Stack.Screen
             name='HOME'
             component={HomeScreen}
             options={{headerShown: false}}
             />
            <Stack.Screen name='Hymn' component={HymnScreen} options={{headerShown: false, gestureEnabled: true}} />
            <Stack.Screen name='Edit Hymn' component={EditHymn} options={{headerShown: false, gestureEnabled: true}} />
          </Stack.Navigator>
  )
}