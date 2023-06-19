import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { ScrollView } from "react-native";
import Combiner from "./hymns/Combiner";
import { connect}from 'react-redux'
import {toggleFavorites} from './redux/favoritesSlice'
import {increment, decrement,} from './redux/fontSlice'
import { MaterialIcons, FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FAB } from '@rneui/themed'
import { ContentData } from "./names";

const iconcolor = '#0be0e0'
const floatingcolor = '#210070';
const back = <FontAwesome name="chevron-left" size={25} color={iconcolor} />;
const font = <FontAwesome name="font" size={23} color={iconcolor} />;
const pen = <FontAwesome5 name="pen" size={20} color={iconcolor} />;
const library = <MaterialIcons name="local-library" size={26} color={iconcolor} />;
export const hearto = <FontAwesome name="heart-o" size={25} color={iconcolor} />;
export const heart = <FontAwesome name="heart" size={25} color={iconcolor} />;
const keypad = <Ionicons name="keypad" size={25} color={iconcolor} />;




export class HymnScreen extends React.Component{
    constructor(props){
        super(props)
        this.id = parseInt(this.props.route.params.id);
        this.hymn = Combiner(this.id);
        this.name = this.props.route.params.hymnName;
        this.state = {
            toggleVisibility: false,
            toggleHeart: !this.props.route.params.toggleHeart?hearto:heart
        }
    }

    ToggleHeartIcon = (item) => {
      this.props.toggleFavorites(item)
      if(this.state.toggleHeart == heart){
        this.setState({toggleHeart: hearto})
      } else if (this.state.toggleHeart == hearto){
        this.setState({toggleHeart: heart})
      }
    }

    ToggleMenuVisibility = () => {
      this.setState({ toggleVisibility: !this.state.toggleVisibility });
    };


    render(){
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.backgroundColor}}>
              <View style={{
                display: "flex", flexDirection: "row", justifyContent: "space-around"
                , alignItems: "center", height: 90, maxWidth: "100%"
                }}>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Pressable style={{marginLeft: 0, marginRight: "5%"}} onPress={() => this.props.navigation.pop()}>
                    {back}
                  </Pressable>
                  {/* <Text style={{fontSize: this.props.size, 
                    color: this.props.theme.color, marginLeft: "5%", marginRight: "5%"
                    }}>
                    {this.id+1}  {(this.name.length > 10)? this.name.substring(0, 15) : this.name}...
                  </Text> */}
                </View>
                <View style={{display: "flex", alignItems: "center", marginLeft: "5%", marginRight: "5%"}}>
                    <Pressable onPress={() => this.ToggleHeartIcon(ContentData[this.id])}>
                      {this.state.toggleHeart}
                    </Pressable>
                  <Text>8.6.8.6</Text>
                </View>
              </View>
            <ScrollView >
            <Text style={{fontSize: this.props.size + 10, ...styles.header, color: this.props.theme.color}}>
                  {this.id+1}
                </Text>
                <Text style={{fontSize: this.props.size, color: this.props.theme.color}}>
                  {this.hymn.song}
                </Text>
                {this.hymn.additional? 
                  <Text style={{...styles.aditional, fontSize: this.props.size}}>
                  {this.hymn.additional}
                  </Text>
                  : null
                }
            </ScrollView>
            {/* <FAB
            visible={this.state.toggleVisibility}
            size="large"
            title={zoomin}
            color= {floatingcolor}
            placement="right"
            style={{ margin: 260, marginRight: 10 }}
            onPress={() => this.props.increment()}
          />
          <FAB
            visible={this.state.toggleVisibility}
            size="large"
            title={zoomOut}
            color= {floatingcolor}
            placement="right"
            style={{ margin: 190, marginRight: 10 }}
            onPress={() => this.props.decrement()}
          /> */}
          <FAB
            visible={true}
            size="large"
            title={keypad}
            color= {floatingcolor}
            placement="right"
            style={{ margin: 50, marginRight: 10 }}
            onPress={() => this.ToggleMenuVisibility()}
          />
          <View style={{display: "flex", flexDirection: "row", height: "8%", 
            justifyContent: "flex-start", alignItems: "center", backgroundColor: "green" }}
          >
            <Pressable style={{paddingBottom: 3, paddingLeft: 25}}>
              {pen}
            </Pressable>
            <Pressable style={{paddingLeft: 20}}>
              {font}
            </Pressable>
            <Pressable style={{paddingBottom: 4 ,paddingLeft: 20}}>
              {library}
            </Pressable>
          </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    size: state.fontS.value,
    theme: state.theme.value
})

const mapDispatchToProps = () => ({
    toggleFavorites,
    increment,
    decrement
})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(HymnScreen)


const styles = StyleSheet.create({
    
})