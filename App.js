import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import HymnScreen from './components/HymnScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';
import  EditHymn  from './components/hymnActionBar/edit';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyALErYKKtRrPICxUq6QKexX8Y2MBFVt5w4",
  authDomain: "nambya-hymnbook.firebaseapp.com",
  projectId: "nambya-hymnbook",
  storageBucket: "nambya-hymnbook.appspot.com",
  messagingSenderId: "772558232411",
  appId: "1:772558232411:web:e7d6389c8da5d0d4c7987e",
  measurementId: "G-85CZH0F75L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  
  return cityList;
}


//MakerCulture17!
const Stack = createNativeStackNavigator()

export default function App() {
  getCities(db)
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
            <Stack.Screen name='Hymn' component={HymnScreen} options={{
              headerShown: false, 
              gestureEnabled: true,
              unmountInactiveRoutes: true,
              }} />
            <Stack.Screen name='Edit Hymn' component={EditHymn} options={{headerShown: false, gestureEnabled: true}} />
          </Stack.Navigator>
  )
}