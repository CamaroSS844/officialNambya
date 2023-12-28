import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View, Pressable} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Font from "./Font/Font";
import { useSelector, useDispatch } from "react-redux";
import { toggleBSState } from "./../redux/toggleBSSlice";

var iconcolor = 'grey';
const font = <FontAwesome name="font" size={21} color={iconcolor} />;
const pen = <FontAwesome5 name="pen" size={18} color={iconcolor} />;
const library = <Ionicons name={"library"} size={25} color={iconcolor} />;



export default function ActionBar(props){
    const dispatch = useDispatch();
    let theme = useSelector( state =>  state.theme.value)
    let bottomShelfState = useSelector( state =>  state.toggleBS.value)

    function handlePresentModal() {
        setTimeout(() => {
            dispatch(toggleBSState());
        }, 100);
      }

        if(!bottomShelfState){

        return (
            <View style={{...styles.bottomNav, 
                backgroundColor: theme.tabBackgroundcolor}}>
                <Pressable style={{padding: 15}} onPress={() => {
                    props.navigation.push("Edit Hymn", { id: props.id, hymnName: props.hymnName, hymnContent: props.hymnContent })
                    }}>
                    {pen}
                </Pressable>
                <Pressable style={{padding: 15,paddingLeft: 30}} onPress={handlePresentModal} >
                  {font}
                </Pressable>
                <Pressable style={{padding: 15,paddingBottom: 15,paddingTop: 12, paddingLeft: 30}}
                onPress={() => props.navigation.push("Library")}
                >
                  {library}
                </Pressable>
            </View>
          );
          }
          return (<Font />);
        
    }


 
const styles = StyleSheet.create({
    bottomNav: {
      display: "flex",
      flexDirection: "row", 
      height: "7%", 
      justifyContent: "center", 
      alignItems: "center", 
      borderTopColor: 'grey', 
      borderTopWidth: 1
    }
})