import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import { getData } from "./redux/secureStore";
import { favoriteslist, fontsize } from "./redux/secureStore";
import { Filter } from "./Search";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { AppLoading } from "expo-app-loading";
// import {
//   useFonts,
//   Inter_400Regular,
//   Inter_400Regular_Italic
// } from "@expo-google-fonts/dev";


const retrieve = async (initializeL, initializeS, initializeT) => {
    let value = await getData(favoriteslist);
    try {
      
      if (value) {
        initializeL(value);
      }
    } catch (err) {
      console.log("error occurred in retrieving list");
    }
  
    value = await getData(fontsize);
    try {
      if (value) {
        initializeS(value);
      }
    } catch (err) {
      console.log("error occurred in retrieving fontsize");
    }
  };

class HomeScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      hymnName: "",
    };
  }
  state = {
    toggleView: false,
  };
    render(){
        // let [fontsLoaded] = useFonts({
        //     Inter_400Regular,
        //     Inter_400Regular_Italic
        //   });
        
        //   if (!fontsLoaded) {
        //     return <AppLoading />;
        //   } else {
            retrieve(
                this.props.initializeList,
                this.props.initializeSize,
                this.props.initializeTheme
              );
            return (
            <View style={{backgroundColor: this.props.theme.backgroundColor}}>
                <StatusBar backgroundColor={this.props.theme.statusbar} barStyle="light-content" />
        <View
          style={{
            ...styles.header,
            backgroundColor: this.props.theme.homeHeaderBackground,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  source={require("./Assets/download.png")}
                  style={styles.pic}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.header1,
                    fontWeight: "bold",
                    color: "#e5e5e5",
                  }}
                >
                  Methodist Church in Zimbabwe
                </Text>
                <Text style={{ ...styles.header2, color: "#e5e5e5" }}>
                  Ndebele Hymnal
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              ...styles.searchContainer,
            }}
          >
            <TextInput
              style={{
                ...styles.searchBar,
                color: "#fefefe",
                backgroundColor: this.props.theme.textinput,
                paddingLeft: 12,
              }}
              placeholder="Search"
              placeholderTextColor={this.props.theme.placeholderColor}
              editable={true}
              cursorColor={"#fefefe"}
              value={this.state.hymnName}
              disableFullscreenUI={true}
              keyboardType={"visible-password"}
              onChangeText={(hymnName) => this.setState({ hymnName })}
            />
            <FontAwesome5
              size={18}
              name={this.state.hymnName.length > 0? "times" :"search"}
              onPress={() => this.state.hymnName.length > 0? this.setState({ hymnName : ''}) : null}
              style={{
                marginLeft: -25,
                marginTop: 10,
                marginRight: 10,
                color: "#fefefeaa",
              }}
            />
          </View>
        </View>

        <Filter name={this.state.hymnName} navigation={this.props.navigation} />
      
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
      padding: 24,
      paddingBottom: 15,
      paddingTop: 10,
    },
    header1: {
      fontSize: 15,
      marginTop: 17,
    },
    header2: {
      fontSize: 14,
      marginTop: 5,
    },
    searchBar: {
      width: "100%",
      marginTop: 20,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 5,
      padding: 8,
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 70,
    },
    pic: {
      height: 64,
      width: 64,
      marginTop: 0,
      marginBottom: -20,
    },
  });