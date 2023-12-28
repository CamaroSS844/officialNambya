import React from "react";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { store } from "./redux/store";
import Favorites from "./favoritesScreen";
import More from "./more";
import { useSelector } from "react-redux";
import HomeScreen from "./homeComp";
import libraryScreen from "./library/libraryScreen";

const Tab = createBottomTabNavigator();

export default function Hometab() {
  let tabBackgroundHeader = useSelector(
    (state) => state.theme.value.tabBackgroundHeader
  );
  let bcolor = useSelector((state) => state.theme.value.tabBackgroundcolor);
  let tabicon = useSelector((state) => state.theme.value.tabIcon);

  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 55,
            backgroundColor: bcolor,
            paddingBottom: 5,
            paddingTop: 5,
            display: 'flex',
            justifyContent: 'space-between'
          },
          tabBarActiveTintColor: tabicon,
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: tabBackgroundHeader,
          },
          headerTintColor: '#fefefe',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo
                  name="home"
                  size={focused ? 28 : 23}
                  color={focused ? tabicon : "gray"}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={({ route }) => ({
            headerShown: true,
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome
                  name={focused ? "heart" : "heart-o"}
                  size={focused ? 28 : 23}
                  color={focused ? tabicon : "gray"}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Library"
          component={libraryScreen}
          options={({ route }) => ({
            headerShown: true,
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                name={"library"}
                size={focused ? 26 : 24}
                color={focused ? tabicon : "gray"}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={({ route }) => ({
            headerShown: true,
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome
                  name={"tasks"}
                  size={focused ? 28 : 23}
                  color={focused ? tabicon : "gray"}
                />
              );
            },
          })}
        />
      </Tab.Navigator>
    </Provider>
  );
}