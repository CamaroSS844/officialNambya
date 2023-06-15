import React from "react";
import { Text,
    StyleSheet,
    View,
    Image,
    StatusBar } from "react-native";
import { ContentData } from "./names";
import HymnListScreen from './HymnListScreen'
import { connect } from "react-redux";
// import { AppLoading } from "expo-app-loading";
// import {
//   useFonts,
//   Inter_400Regular,
//   Inter_400Regular_Italic
// } from "@expo-google-fonts/dev";


class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        toggleView: false
    }
    render(){
        // let [fontsLoaded] = useFonts({
        //     Inter_400Regular,
        //     Inter_400Regular_Italic
        //   });
        
        //   if (!fontsLoaded) {
        //     return <AppLoading />;
        //   } else {
            return (
            <View style={{backgroundColor: this.props.theme.backgroundColor}}>
                <StatusBar backgroundColor={this.props.theme.statusbar} barStyle="light-content" />
                <View style={{...styles.header, backgroundColor: this.props.theme.homeHeaderBackground}}>
                    <Image source={require('./Assets/download.png')} style={styles.pic}/>
                    <Text style={{...styles.paragraph}}>Methodist Church in Zimbabwe</Text>
                    <Text style={{...styles.paragraph}}>Nambya Hymnal</Text>
                </View>

                <HymnListScreen data={ContentData} navigation={this.props.navigation}/>
                
            </View>
        )
            // }
    }
}

const mapStateToProps = state => ({
    theme: state.theme.value
})

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(HomeScreen)

const styles = StyleSheet.create({
    header: {
        alignContent: 'center',
        padding: 10
    },
    pic: {
        width: 95,
        height: 95,
        alignSelf: 'center'
    },
    paragraph: {
        color: '#f7f7f7',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5
    }
})