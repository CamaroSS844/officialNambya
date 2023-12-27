import React, {useRef} from "react";
import {
  StyleSheet,
  Pressable,
  Dimensions,
  PanResponder, 
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleBSState } from "../../redux/toggleBSSlice";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Content from "./Content";
// import { BottomSheet, Button, ListItem } from '@rneui/themed';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const init = (SCREEN_HEIGHT / (1.8) ) / SCREEN_HEIGHT  * 100;


 function Font(){

    
    const dispatch = useDispatch()

    const pan = useRef(new Animated.ValueXY({x: 0, y: 800})).current;
    console.log(pan)

    Animated.timing(pan, {
      toValue: {x: 0, y: 0},
      duration: 600,
      useNativeDriver: false
    }).start();

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
          const y = (pageY / SCREEN_HEIGHT) * 100;
          if(y < init){
            Animated.spring(pan, {
              toValue: {x: 0, y: 2},
              useNativeDriver: false,
            }).start();
          }else{
            Animated.timing(pan, {
              toValue: {x: 0, y: 600},
              duration: 600,
              useNativeDriver: false
            }).start();
            setTimeout(() => {
              dispatch(toggleBSState())
            }, 500)
            
          }
        },
      }),
    ).current;

    return (
        <Pressable style={styles.ActionContainer} >
            <Animated.View 
            style={{ ...styles.ActionContainerChild ,transform: [{translateY: pan.y}]}}
            {...panResponder.panHandlers}>
                <Content />
            </Animated.View>
        </Pressable>
    )
    
} 

export default Font


  const styles = StyleSheet.create({
    buttonContainer: {
      display: "flex",
      flexDirection: "row", 
    },
    ActionContainer: {
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 1,
        position: "absolute",
        backgroundColor: "#00000075",
        width: "100%"
    },
    ActionContainerChild: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        height: SCREEN_HEIGHT,
        top: SCREEN_HEIGHT / 2,
    },
    divisons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#e633334e",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        alignSelf: "baseline",
    },
    line : {
        backgroundColor: "none",
        paddingRight: 20
    },
    divHead: {
        alignSelf: "flex-start",
        padding: 3,
        fontSize: 13
    },
    buttonText: {
        color: "red"
    },
    Line : {
        alignSelf: "center",
        borderColor: "grey",
        borderRadius: 5, 
        marginTop: 0,
        width: 55,
        height: 5,
        backgroundColor: "#5e5e5e"
    },
})
  