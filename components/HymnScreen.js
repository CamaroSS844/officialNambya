import React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import Combiner from "./hymns/Combiner";
import { connect}from 'react-redux';
import {toggleFavorites} from './redux/favoritesSlice';
import {increment, decrement,} from './redux/fontSlice';
import { setKeypadVisibility } from "./redux/keypadSlice";
import { FontAwesome,Ionicons } from "@expo/vector-icons";
import { FAB } from '@rneui/themed';
import { ContentData } from "./names";
import ActionBar from "./hymnActionBar/actionBar";
import KeypadScreen from "./hymnActionBar/keypadScreen";

const floatingcolor = 'red';
const back = <FontAwesome name="chevron-left" size={25} color={floatingcolor} />;
const keypad = <Ionicons name="keypad" size={23} color={"#fff"} />;

function toggleHeartFunc(bool, color){
  if (bool)  return <FontAwesome name="heart-o" size={25} color={color} />;
    return <FontAwesome name="heart" size={25} color={color} />;
  }



export class HymnScreen extends React.Component{
    constructor(props){
        super(props)
        this.id = parseInt(this.props.route.params.id);
        this.iconColor = this.props.theme.tabIcon;
        this.name = this.props.route.params.hymnName;
        this.state = {
            hymn: Combiner(this.id),
            toggleVisibility: false,
            inFavorites: !this.props.route.params.toggleHeart,
            toggleHeart: toggleHeartFunc(this.props.route.params.toggleHeart, this.props.theme.tabIcon)
        }
    }

    toggle = (item) => {
      this.props.toggleFavorites(item);
      this.setState({inFavorites: !this.state.inFavorites});
      this.setState({toggleHeart: toggleHeartFunc(this.state.inFavorites, this.iconColor)});
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
                  <Pressable style={{marginLeft: 0, marginRight: "5%"}} onPress={() => this.props.navigation.popToTop()}>
                    {back}
                  </Pressable>
                  <Text style={{fontSize: 20, 
                    color: this.props.theme.color, marginLeft: "5%", marginRight: "5%"
                    }}>
                    {this.id+1}  {(this.name.length > 10)? this.name.substring(0, 15) : this.name}...
                  </Text>
                </View>
                <View style={{display: "flex", alignItems: "center", marginLeft: "5%", marginRight: "5%"}}>
                    <Pressable onPress={() => this.toggle(ContentData[this.id])}>
                      {this.state.toggleHeart}
                    </Pressable>
                  <Text>8.6.8.6</Text>
                </View>
              </View>
            <ScrollView>
                <Text style={{fontSize: this.props.size, color: this.props.theme.color, lineHeight: this.props.lineSpacing}}>
                  {this.state.hymn.song}
                </Text>
                {this.state.hymn.additional? 
                  <Text style={{...styles.aditional, fontSize: this.props.size}}>
                  {this.state.hymn.additional}
                  </Text>
                  : null
                }
            </ScrollView>

          {/*change FAB from one by rneui themed to one by react native paper*/}
          <ActionBar />
          <KeypadScreen navigation={this.props.navigation} setState={this.setState} current={this.id+1} name={this.state.hymn.name}/>
          <FAB
            visible={true}
            size="large"
            title={keypad}
            color= {floatingcolor}
            placement="right"
            style={{ margin: 30, marginRight: 10, borderColor: "#fff", 
            borderWidth: 10, borderRadius: 40}}
            onPress={() => this.props.setKeypadVisibility()}
          />
          </View>
        )
    }
}

const mapStateToProps = state => ({
    size: state.fontS.value,
    theme: state.theme.value,
    lineSpacing: state.LineSpace.value
});

const mapDispatchToProps = () => ({
    toggleFavorites,
    increment,
    decrement,
    setKeypadVisibility
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(HymnScreen);