import { StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { navToNewHymn } from "../HymnListScreen";
import { ContentData } from "../names";
import { connect}from 'react-redux';
import { setKeypadVisibility } from "../redux/keypadSlice";

class KeypadScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hymnName: ""
        }
    }

    render(){
      if (this.props.keypadVisibility){

        return ( 
            <Pressable style={styles.Container} onPress={() => {
              this.setState({hymnName: ""})
              this.props.setKeypadVisibility()
              }}> 
                <TextInput
                  style={{
                    ...styles.searchBar,
                    color: "#fefefe",
                    backgroundColor: this.props.theme.textinput,
                    paddingLeft: 12,
                  }}
                  placeholder="Enter hymn number"
                  placeholderTextColor={this.props.theme.placeholderColor}
                  editable={true}
                  cursorColor={"#fefefe"}
                  autoFocus= {true}
                  inputMode={"numeric"}
                  value={this.state.hymnName}
                  onSubmitEditing= {() => {
                    hymnNumber = parseInt(this.state.hymnName);
                    this.props.setKeypadVisibility();
                    if (!isNaN(this.state.hymnName) && this.props.current != hymnNumber){
                      hymnObj = ContentData[hymnNumber-1];
                      navToNewHymn(hymnObj, hymnNumber, this.props.list, this.props.navigation, hymnObj.name)
                      this.setState({hymnName: ""});
                    }
                  }}
                  onChangeText={(hymnName) => {
                    lastChar = parseInt(hymnName.slice(-1));
                    if(!isNaN(lastChar)   || (hymnName == "")){
                      this.setState({ hymnName })
                    } else null
                  }}
                />
            </Pressable>
         );
      } else {
        return null
      }
    }
}
        
const mapStateToProps = state => ({
    list: state.fList.value,
    theme: state.theme.value,
    keypadVisibility: state.keypadS.value
})

const mapDispatchToProps = () => ({
  setKeypadVisibility
})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(KeypadScreen)


const styles = StyleSheet.create({
  Container: {
    display: "flex",  
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#00000075",
    width: "100%",
    height: "100%"
},
    searchBar: {
      width: "85%",
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
  });