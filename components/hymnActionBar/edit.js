import React from "react";
import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { FAB } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { connect}from 'react-redux';
import { back } from "../HymnScreen";
//for upload icon

class EditHymn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.route.params.id,
            name: this.props.route.params.hymnName, 
            hymnContent: this.props.route.params.hymnContent,
            iconColor: "grey"
            }
    }

    render(){
        return (
            <View style={{flex: 1, display: "flex", backgroundColor: "#fff", width: "100%"}}>
            <View style={{
                display: "flex", flexDirection: "row", justifyContent: "space-between"
                , alignItems: "center", height: 65, maxWidth: "100%"
                }}>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Pressable style={{marginLeft: "10%", marginRight: "5%"}} onPress={() => this.props.navigation.pop()}>
                    {back}
                  </Pressable>
                  <View>
                    <Text style={{fontSize: 20, marginLeft: 20,
                      color: this.props.theme.color}}>
                      Edit Hymn {this.state.id}
                    </Text>
                  </View>
                </View>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Pressable onPress={() => console.log("dont forget to add save feature for edited hymns")} 
                    style={{  paddingRight: 20 }}>
                          <Text style={{fontSize: 18,fontWeight: "bold", color: this.state.iconColor}}>Save</Text>
                  </Pressable>
                  <Pressable onPress={() => console.log("dont forget to add save feature for edited hymns")} 
                    style={{ marginRight: "5%"}}>
                          <FontAwesome name="upload" size={23} color={this.state.iconColor} />
                  </Pressable>
                </View>
              </View>
            <View>
                <TextInput
                    style={{
                      ...styles.searchBar,
                      color: this.props.theme.color,
                      backgroundColor: this.props.theme.tabBackgroundcolor,
                      paddingLeft: 12,
                      height: "95%",
                      fontSize: 18
                    }}
                    editable={true}
                    cursorColor={this.props.theme.color}
                    value={this.state.hymnContent}
                    keyboardType={"visible-password"}
                    multiline={true}
                    autoFocus = {true}
                    onChangeText={(hymnContent) => this.setState({ hymnContent, iconColor: "red" })}
                />
            </View>
          </View>
        )
    }
}

const mapStateToProps = state => ({
    size: state.fontS.value,
    theme: state.theme.value,
    lineSpacing: state.LineSpace.value
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(EditHymn);

const styles = StyleSheet.create({
    searchBar: {
      width: "100%",
      marginBottom: 0,
      borderRadius: 5,
    },
    title : {
      marginLeft: 20,
      marginTop: 20
    }
  });