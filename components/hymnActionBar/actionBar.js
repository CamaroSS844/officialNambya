import React from "react";
import { StyleSheet, View, Pressable} from "react-native";
import { connect }from 'react-redux';
import { MaterialIcons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Font from "./Font/Font";
import { toggleBSState } from "./../redux/toggleBSSlice";

var iconcolor = 'grey';
const font = <FontAwesome name="font" size={21} color={iconcolor} />;
const pen = <FontAwesome5 name="pen" size={18} color={iconcolor} />;
const library = <MaterialIcons name="local-library" size={24} color={iconcolor} />;



class ActionBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(!this.props.bottomShelfState){

        return (
            <View style={{...styles.bottomNav, 
                backgroundColor: this.props.theme.tabBackgroundcolor}}>
                <Pressable style={{paddingBottom: 3, paddingLeft: 25}}>
                    {pen}
                </Pressable>
                <Pressable style={{paddingLeft: 20}} onPress={() => {
                    this.props.toggleBSState()}} >
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
}


const mapStateToProps = state => ({
    size: state.fontS.value,
    theme: state.theme.value,
    bottomShelfState: state.toggleBS.value
})

const mapDispatchToProps = () => ({
    toggleBSState
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(ActionBar)

 
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