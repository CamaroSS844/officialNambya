import React, { useState, useRef } from "react";
import { Text, View, Pressable, ScrollView, Animated, PanResponder } from "react-native";
import Combiner from "./hymns/Combiner";
import { useSelector, useDispatch}from 'react-redux';
import {toggleFavorites} from './redux/favoritesSlice';
import { setKeypadVisibility } from "./redux/keypadSlice";
import { FontAwesome,Ionicons } from "@expo/vector-icons";
import { FAB } from '@rneui/themed';
import { ContentData } from "./names";
import ActionBar from "./hymnActionBar/actionBar";
import KeypadScreen from "./hymnActionBar/keypadScreen";
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

const floatingcolor = 'red';
export const back = <FontAwesome name="chevron-left" size={25} color={floatingcolor} />;
const keypad = <Ionicons name="keypad" size={23} color={"#fff"} />;

function toggleHeartFunc(bool, color){
  if (bool)  return <FontAwesome name="heart-o" size={25} color={color} />;
    return <FontAwesome name="heart" size={25} color={color} />;
  }



export default function HymnScreen (props){


  const dispatch = useDispatch();
  let size= useSelector(state =>  state.fontS.value);
  let theme = useSelector(state => state.theme.value);
  let lineSpacing = useSelector(state => state.LineSpace.value);
  let fontFam = useSelector(state => state.fontFam.value);

  const [id, setId] = useState(parseInt(props.route.params.id));
  iconColor = theme.tabIcon;
  Name = props.route.params.hymnName;
  const [hymn, setHymn] = useState(Combiner(id));
  const [inFavorites, setInFavorites] = useState(!props.route.params.toggleHeart);
  const [toggleHeart, setToggleHeart] = useState(toggleHeartFunc(props.route.params.toggleHeart, theme.tabIcon));
  


  const toggle = (item) => {
    dispatch(toggleFavorites(item));
    setInFavorites(!inFavorites);
    setToggleHeart(toggleHeartFunc(inFavorites, iconColor));
  }

  //adding swipe gestures for navigation
  const pan = useRef(new Animated.ValueXY({x: 0, y: 800})).current;
  console.log(pan)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        props.navigation.push("HymnScreen", {id: id + 1, hymnName: ContentData[id].name, toggleHeart: inFavorites})
        // const y = (pageY / SCREEN_HEIGHT) * 100;
        // if(y < init){
        //   Animated.spring(pan, {
        //     toValue: {x: 0, y: 2},
        //     useNativeDriver: false,
        //   }).start();
        // }else{
        //   Animated.timing(pan, {
        //     toValue: {x: 0, y: 600},
        //     duration: 600,
        //     useNativeDriver: false
        //   }).start();
        //   setTimeout(() => {
        //     dispatch(toggleBSState())
        //   }, 500)
        // }
      },
    }),
  ).current;

  return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <View style={{
          display: "flex", flexDirection: "row", justifyContent: "space-around"
          , alignItems: "center", height: 90, maxWidth: "100%"
          }}>
          <View style={{display: "flex", flexDirection: "row"}}>
            <Pressable style={{marginLeft: 0, marginRight: "5%"}} onPress={() => props.navigation.popToTop()}>
              {back}
            </Pressable>
            <Text style={{fontSize: 20, 
              color: theme.color, marginLeft: "5%", marginRight: "5%"
              }}>
              {id+1}  {(Name.length > 10)? Name.substring(0, 15) : Name}...
            </Text>
          </View>
          <View style={{display: "flex", alignItems: "center", marginLeft: "5%", marginRight: "5%"}}>
              <Pressable onPress={() => toggle(ContentData[id])}>
                {toggleHeart}
              </Pressable>
            <Text>8.6.8.6</Text>
          </View>
        </View>
      <ScrollView>
          <Text style={{fontSize: size, color: theme.color, lineHeight: lineSpacing, fontFamily: fontFam}}>
            {hymn.song}
          </Text>
          {hymn.additional? 
            <Text style={{...styles.aditional, fontSize: size}}>
            {hymn.additional}
            </Text>
            : null
          }
      </ScrollView>

    {/*change FAB from one by rneui themed to one by react native paper*/}
    <ActionBar navigation={props.navigation}  id={id+1} hymnName={Name} hymnContent={hymn.song} font={fontFam}/>
    <KeypadScreen navigation={props.navigation} current={id+1} name={hymn.Name}/>
    <FAB
      visible={true}
      size="large"
      title={keypad}
      color= {floatingcolor}
      placement="right"
      style={{ margin: 30, marginRight: 10, borderColor: "#fff", 
      borderWidth: 10, borderRadius: 40}}
      onPress={() => dispatch(setKeypadVisibility())}
    />
    </View>
  )
    }


