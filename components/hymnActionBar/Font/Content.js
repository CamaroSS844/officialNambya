import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import { setFontSize, onSliderChange } from "../../redux/fontSlice";
import { setLineHeight } from "../../redux/linespaceSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { toggleBSState } from "../../redux/toggleBSSlice";
import { setfontFam } from "../../redux/fontFamSlice";

const inter = "Inter_500Medium";
const roboto = "RobotoCondensed_400Regular";
const source = "SourceSansPro_400Regular";
const playfair = "PlayfairDisplaySC_400Regular";
typefaceActiveBack = {backgroundColor: "#e6333369"};
typefaceInactiveBack = {backgroundColor: "lightgrey"};
typefaceTextActive = {color: "red"};
typefaceTextInactive = {color: "black"};

 class Content extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.props.toggle;
        this.theme = this.props.theme;
        this.state = {
            //this.linespacing default or current value
            iconcolor: "grey",
            interButtonBackground: (this.props.fontFam == inter)? typefaceActiveBack:typefaceInactiveBack,
            robotoButtonBackground: (this.props.fontFam == roboto)? typefaceActiveBack:typefaceInactiveBack,
            sourceButtonBackground: (this.props.fontFam == source)? typefaceActiveBack:typefaceInactiveBack,
            playfairButtonBackground: (this.props.fontFam == playfair)? typefaceActiveBack:typefaceInactiveBack,
            interTextColor: (this.props.fontFam == inter)? typefaceTextActive:typefaceTextInactive,
            robotoTextColor: (this.props.fontFam == roboto)? typefaceTextActive:typefaceTextInactive,
            sourceTextColor: (this.props.fontFam == source)?typefaceTextActive: typefaceTextInactive,
            playfairTextColor: (this.props.fontFam == playfair)? typefaceTextActive:typefaceTextInactive,
            fontFam: this.props.fontFam
        }
    }

    setBtnStyle = (val) => {
        switch(val){
            case 'Inter_500Medium':
                this.setState({
                    interButtonBackground: typefaceActiveBack,
                    robotoButtonBackground: typefaceInactiveBack,
                    sourceButtonBackground: typefaceInactiveBack,
                    playfairButtonBackground: typefaceInactiveBack,
                    interTextColor: typefaceTextActive,
                    robotoTextColor: typefaceTextInactive,
                    sourceTextColor: typefaceTextInactive,
                    playfairTextColor: typefaceTextInactive,
                })
                break;
            case 'RobotoCondensed_400Regular':
                this.setState({
                    interButtonBackground: typefaceInactiveBack,
                    robotoButtonBackground: typefaceActiveBack,
                    sourceButtonBackground: typefaceInactiveBack,
                    playfairButtonBackground: typefaceInactiveBack,
                    interTextColor: typefaceTextInactive,
                    robotoTextColor: typefaceTextActive,
                    sourceTextColor: typefaceTextInactive,
                    playfairTextColor: typefaceTextInactive,
                })
                break;
            case 'SourceSansPro_400Regular':
                this.setState({
                    interButtonBackground: typefaceInactiveBack,
                    robotoButtonBackground: typefaceInactiveBack,
                    sourceButtonBackground: typefaceActiveBack,
                    playfairButtonBackground: typefaceInactiveBack,
                    interTextColor: typefaceTextInactive,
                    robotoTextColor: typefaceTextInactive,
                    sourceTextColor: typefaceTextActive,
                    playfairTextColor: typefaceTextInactive,
                })
                break;
            case 'PlayfairDisplaySC_400Regular':
                this.setState({
                    interButtonBackground: typefaceInactiveBack,
                    robotoButtonBackground: typefaceInactiveBack,
                    sourceButtonBackground: typefaceInactiveBack,
                    playfairButtonBackground: typefaceActiveBack,
                    interTextColor: typefaceTextInactive,
                    robotoTextColor: typefaceTextInactive,
                    sourceTextColor: typefaceTextInactive,
                    playfairTextColor: typefaceTextActive,
                })
                break;
            default:
                this.setState({
                    interButtonBackground: typefaceInactiveBack,
                    robotoButtonBackground: typefaceInactiveBack,
                    sourceButtonBackground: typefaceInactiveBack,
                    playfairButtonBackground: typefaceInactiveBack,
                    interTextColor: typefaceTextInactive,
                    robotoTextColor: typefaceTextInactive,
                    sourceTextColor: typefaceTextInactive,
                    playfairTextColor: typefaceTextInactive,
                })
        }
    }
    typeFaceButtonHandler = (actionPayload, stylePayload) => {
        this.props.setfontFam(actionPayload);
        this.setBtnStyle(stylePayload);
    }

    render(){
        return (
                <View style={{...styles.Container, backgroundColor: this.props.theme.backgroundColor}} >
                <Pressable style={{width: "100%", backgroundColor: this.theme.backgroundColor}} hitSlop={30}>
                  <Pressable  style={{...styles.Line, backgroundColor: this.theme.color}} hitSlop={30}/>
                </Pressable>
                <View style={styles.divisons}>
                    <Text style={{...styles.divHead, color: this.theme.color}} >Line Spacing</Text>
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
                <View style={{...styles.divisons, paddingBottom: 20, backgroundColor: this.theme.backgroundColor}}>
                    <Text style={{...styles.divHead, color: this.theme.color}}>Text Size</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 15, color: this.theme.color}}>Aa</Text>
                        <Slider
                            style={{width: 250, height: 40}}
                            minimumValue={15}
                            maximumValue={28} 
                            value = {this.props.size} 
                            onValueChange = {e => this.props.onSliderChange(e)}
                            onSlidingComplete = {() => this.props.setFontSize()}
                            minimumTrackTintColor="red"
                            maximumTrackTintColor={this.theme.color}
                        />
                        <Text style={{fontSize: 28, color: this.theme.color}}>Aa</Text>
                    </View>
                </View>
                <View style={{...styles.divisons, paddingBottom: 80,backgroundColor: this.theme.backgroundColor}}>
                    <Text style={{...styles.divHead, color: this.theme.color}}>Typeface</Text>
                    <ScrollView horizontal={true} style={{backgroundColor: this.theme.backgroundColor}}>
                        <Pressable onPress={() => this.typeFaceButtonHandler('Inter', inter)} style={{...styles.button, ...this.state.interButtonBackground}}>
                            <Text style={{...this.state.interTextColor}}>Inter</Text>
                        </Pressable>
                        <Pressable onPress={() => this.typeFaceButtonHandler('Roboto', roboto)} style={{...styles.button, ...this.state.robotoButtonBackground}}>
                            <Text style={{...this.state.robotoTextColor}}>Roboto</Text>
                        </Pressable>
                        <Pressable onPress={() => this.typeFaceButtonHandler('SourceSans', source)} style={{...styles.button, ...this.state.sourceButtonBackground}}>
                            <Text style={{...this.state.sourceTextColor}}>SourceSans</Text>
                        </Pressable>
                        <Pressable onPress={() => this.typeFaceButtonHandler('Playfair', playfair)} style={{...styles.button, ...this.state.playfairButtonBackground}}>
                            <Text style={{...this.state.playfairTextColor}}>Playfair</Text>
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
    lineSpacing: state.LineSpace.value,
    fontFam: state.fontFam.value
  });
  
  const mapDispatchToProps = () => ({
    setFontSize,
    onSliderChange,
    toggleTheme,
    setLineHeight,
    toggleBSState,
    setfontFam
  });
  
  export default connect(mapStateToProps, mapDispatchToProps())(Content);

  const styles = StyleSheet.create({
    Container: {
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
        borderRadius: 5, 
        marginTop: 0,
        width: 55,
        height: 5,
    },
})
  