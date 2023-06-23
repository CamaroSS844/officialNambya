import React, {useRef} from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  PanResponder, Animated
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleBSState } from "../../redux/toggleBSSlice"
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Content from "./Content";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');



 export default function Font(props){
    
    const bottomshelf = useSelector((state) => state.toggleBS.value)
    const dispatch = useDispatch()

    const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {dispatch(toggleBSState())},
    }),
  ).current;

    return (
        <Pressable style={styles.ActionContainer} onPress={() => dispatch(toggleBSState())}>
            <Animated.View 
            style={{...styles.ActionContainerChild, transform: [{translateY: pan.y}]}}
            {...panResponder.panHandlers}>
                <View style={{width: "100%", padding: 2}}>
                <View  style={styles.Line}/>
                </View>
                <Content />
            </Animated.View>
        </Pressable>
    )
    
} 


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
        top: SCREEN_HEIGHT / 1.8,
        padding: 20
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
  