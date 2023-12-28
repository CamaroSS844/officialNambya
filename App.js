import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import HymnScreen from './components/HymnScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';
import  EditHymn  from './components/hymnActionBar/edit';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import PrayerScreen from './components/library/bhabhatiza';
import libraryScreen from './components/library/libraryScreen';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration


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
            headerTintColor: '#e6e5e5',
            detachInactiveScreens: true
          }}
          >
            <Stack.Screen
             name='HOME'
             component={HomeScreen}
             options={{headerShown: false}}
             />
             <Stack.Screen
             name='Minamato Woku Bhabhatiza Bana'
             component={PrayerScreen}
             options={{headerShown: false}}
             />
            <Stack.Screen name='Hymn' component={HymnScreen} options={{
              headerShown: false, 
              gestureEnabled: true,
              unmountInactiveRoutes: true,
            }} />
            <Stack.Screen name='Edit Hymn' component={EditHymn} options={{headerShown: false, gestureEnabled: true}} />
            <Stack.Screen name='Library' component={libraryScreen} options={{headerShown: false, gestureEnabled: true}} />
          </Stack.Navigator>
  )
}