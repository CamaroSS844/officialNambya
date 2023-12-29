import React from "react";
import { View } from "react-native";
import { useSelector, useDispatch}from 'react-redux';
import { Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { libraryContent, libraryList } from "./libraryList";
import KeypadScreen from "../hymnActionBar/keypadScreen";
import ActionBar from "../hymnActionBar/actionBar";
import { keypad, back, floatingcolor } from "../HymnScreen";
import { FAB } from '@rneui/themed';
import { setKeypadVisibility } from "../redux/keypadSlice";
//importing google fonts
import * as Font from 'expo-font';
import {Inter_500Medium } from '@expo-google-fonts/inter';
import { RobotoCondensed_400Regular, SourceSansPro_400Regular, PlayfairDisplaySC_400Regular } from "@expo-google-fonts/dev";

Font.loadAsync({
  Inter_500Medium,
  RobotoCondensed_400Regular,
  SourceSansPro_400Regular,
  PlayfairDisplaySC_400Regular
});


export default function PrayerScreen(props) {
    const id  = props.route.params.id;
    const dispatch = useDispatch();
    let size= useSelector(state =>  state.fontS.value);
    let theme = useSelector(state => state.theme.value);
    let lineSpacing = useSelector(state => state.LineSpace.value);
    let fontFam = useSelector(state => state.fontFam.value);
    const Name = libraryList[id].name;

    iconColor = theme.tabIcon;
  


    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <View style={{
          display: "flex", flexDirection: "row", paddingLeft: 15,alignItems: "center", height: 90, maxWidth: "100%"
          }}>
          <View style={{display: "flex", flexDirection: "row"}}>
            <Pressable style={{marginLeft: 0, marginRight: "5%"}} onPress={() => props.navigation.popToTop()}>
              {back}
            </Pressable>
            <Text style={{fontSize: 20, 
              color: theme.color, marginLeft: "5%", marginRight: "5%"
              }}>
              {(Name.length > 10)? Name.substring(0, 25) : Name}...
            </Text>
          </View>
        </View>
        <ScrollView style={{...styles.container, backgroundColor: theme.backgroundColor}}>
            <Text style={{fontSize: size, color: theme.color, lineHeight: lineSpacing, fontFamily: fontFam}}>
            {libraryContent[id]}                                                                                         
            </Text>
        </ScrollView>
        <ActionBar navigation={props.navigation}  id={id} hymnName={Name} hymnContent={libraryContent[id]} font={fontFam}/>
        <KeypadScreen navigation={props.navigation} current={id} name={Name}/>
        <FAB
            visible={true}
            size="large"
            title={keypad}
            color= {floatingcolor}
            placement="right"
            style={{ margin: 30, marginRight: 10, borderColor: theme.backgroundColor , 
            borderWidth: 10, borderRadius: 40}}
            onPress={() => dispatch(setKeypadVisibility())}
        />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 0
    },
    }
)