import "react-native-gesture-handler";
import React, { useRef } from "react";
import { StyleSheet, View, Pressable, useWindowDimensions} from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Font from "./Font/Font";
import { useSelector, useDispatch } from "react-redux";
import { toggleBSState } from "./../redux/toggleBSSlice";

var iconcolor = 'grey';
const font = <FontAwesome name="font" size={21} color={iconcolor} />;
const pen = <FontAwesome5 name="pen" size={18} color={iconcolor} />;
const library = <MaterialIcons name="local-library" size={24} color={iconcolor} />;



export default function ActionBar(props){
    const dispatch = useDispatch();
    let size  = useSelector(state =>  state.fontS.value)
    let theme = useSelector( state =>  state.theme.value)
    let bottomShelfState = useSelector( state =>  state.toggleBS.value)

    const bottomSheetModalRef = useRef(null);
    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            dispatch(toggleBSState());
        }, 100);
      }

        if(!bottomShelfState){

        return (
            <View style={{...styles.bottomNav, 
                backgroundColor: theme.tabBackgroundcolor}}>
                <Pressable style={{paddingBottom: 3, paddingLeft: 25}} onPress={() => {
                    props.navigation.push("Edit Hymn", { id: props.id, hymnName: props.hymnName, hymnContent: props.hymnContent })
                    }}>
                    {pen}
                </Pressable>
                <Pressable style={{paddingLeft: 20}} onPress={handlePresentModal} >
                  {font}
                </Pressable>
                <Pressable style={{paddingBottom: 4 ,paddingLeft: 20}}>
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
      justifyContent: "flex-start", 
      alignItems: "center", 
      borderTopColor: 'grey', 
      borderTopWidth: 1
    }
})