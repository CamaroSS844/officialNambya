import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

// import * as Sharing from "expo-sharing"
import { connect } from "react-redux";
import { setFontSize, onSliderChange } from "../../redux/fontSlice";
import { setLineHeight } from "../../redux/linespaceSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { toggleBSState } from "../../redux/toggleBSSlice";


 class Content extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.props.toggle;
        this.state = {
            //this.linespacing default or current value
            iconcolor: "grey",
        }
    }

    render(){
        return (
                <View style={styles.Container} >
                <Pressable style={{width: "100%"}} hitSlop={30}>
                  <Pressable  style={styles.Line} hitSlop={5}/>
                </Pressable>
                <View style={styles.divisons}>
                    <Text style={styles.divHead} >Line Spacing</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable style={{...styles.button, ...styles.line}} 
                        onPress={() => this.props.setLineHeight(35)}>
                            <FontAwesome name="align-justify" size={40} color={this.state.iconcolor} />
                        </Pressable>
                        <Pressable style={{...styles.button, ...styles.line}} 
                        onPress={() => this.props.setLineHeight(40)}>
                            <FontAwesome name="bars" size={45} color={this.state.iconcolor} />
                        </Pressable>
                        <Pressable style={{...styles.button, ...styles.line}} 
                        onPress={() => this.props.setLineHeight(45)}>
                            <FontAwesome name="navicon" size={50} color={this.state.iconcolor} />
                        </Pressable>
                    </View>
                </View>
                <View style={{...styles.divisons, paddingBottom: 20}}>
                    <Text style={styles.divHead}>Text Size</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 15}}>Aa</Text>
                        <Slider
                            style={{width: 300, height: 40}}
                            minimumValue={15}
                            maximumValue={28} 
                            value = {this.props.size} 
                            onValueChange = {e => this.props.onSliderChange(e)}
                            onSlidingComplete = {() => this.props.setFontSize()}
                            minimumTrackTintColor="red"
                            maximumTrackTintColor="#000000"
                        />
                        <Text style={{fontSize: 28}}>Aa</Text>
                    </View>
                </View>
                <View style={styles.divisons}>
                    <Text style={styles.divHead}>Typeface</Text>
                    <ScrollView horizontal={true}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Inter</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Calibri</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Monospace</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Monospace</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Monospace</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Monospace</Text>
                        </Pressable>
                    </ScrollView>  
                </View>
                </View>
                )
    }
} 

const mapStateToProps = (state) => ({
    size: state.fontS.value,
    theme: state.theme.value,
    lineSpacing: state.LineSpace.value
  });
  
  const mapDispatchToProps = () => ({
    setFontSize,
    onSliderChange,
    toggleTheme,
    setLineHeight,
    toggleBSState
  });
  
  export default connect(mapStateToProps, mapDispatchToProps())(Content);

  const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#fff", 
        padding: 30, 
        paddingLeft: 20, 
        paddingRight: 10,
        borderRadius: 20
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row", 
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
  