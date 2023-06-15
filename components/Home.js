import React from "react";
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { store } from './redux/store'
import Favorites from './favoritesScreen'
import Search from './Search'
import More from './more'
import { useDispatch, useSelector } from "react-redux";
import { initializeList } from './redux/favoritesSlice'
import { initialize } from "./redux/secureStore";
import HomeScreen from "./homeComp";

const Tab = createBottomTabNavigator()
// let executed = false

// async function update(dispatch){
//     if(!executed){
//         executed = true
//         list = await initialize('favorites')
//         .then(value => {
//             dispatch(initializeList(value))
//         })}
//     return null
//     }

export default function Hometab(){
    
    // const dispatch = useDispatch()
    // list = !executed? update(dispatch): null
    let tabBackgroundHeader = useSelector(state => state.theme.value.tabBackgroundHeader)
    let bcolor = useSelector(state => state.theme.value.tabBackgroundcolor)
    let tabicon = useSelector(state => state.theme.value.tabIcon)
    let tabiconIn = useSelector(state => state.theme.value.tabIconInactive)

    return (
        <Provider store={store}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 50,
                        backgroundColor: bcolor
                    },
                    tabBarActiveTintColor: tabicon,
                    tabBarInactiveTintColor: tabiconIn,
                    tabBarHideOnKeyboard: true,
                    headerStyle: {
                        backgroundColor: tabBackgroundHeader
                    }, 
                    headerTintColor: '#fff',
                    tabBarLabelStyle: {
                        fontSize: 13
                    },
                }}
            >
                <Tab.Screen
                    name='Home' 
                    component={HomeScreen} 
                    options ={({route}) => ({
                        headerShown: false,
                        tabBarIcon: ({focused}) => {
                            return (
                                <Entypo
                                  name="home"
                                  size={focused ? 28 : 23}
                                  color={focused ? tabicon : tabiconIn}
                                />
                            );
                        }
                    })}
                />
                <Tab.Screen
                    name='Search' 
                    component={Search}
                    options ={({route}) => ({
                        headerShown: true,
                        tabBarIcon: ({focused}) => {
                            return (
                                <FontAwesome
                                  name='search'
                                  size={focused ? 28 : 23}
                                  color={focused ? tabicon : tabiconIn}
                                />
                            );
                        }
                    })}
                />
                <Tab.Screen
                    name='Favorites' 
                    component={Favorites}
                    options ={({route}) => ({
                        headerShown: true,
                        tabBarIcon: ({focused}) => {
                            return (
                                <FontAwesome
                                  name={focused ?  "heart": 'heart-o'}
                                  size={focused ? 28 : 23}
                                  color={focused ? tabicon : tabiconIn}
                                />
                            );
                        }
                    })}
                />
                <Tab.Screen
                    name='More' 
                    component={More}
                    options ={({route}) => ({
                        headerShown: true,
                        tabBarIcon: ({focused}) => {
                            return (
                                <FontAwesome
                                  name={'tasks'}
                                  size={focused ? 28 : 23}
                                  color={focused ? tabicon : tabiconIn}
                                />
                            );
                        }
                    })}
                />
            </Tab.Navigator>
        </Provider>
    )
}


