import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { toggleFavorites, clearAll } from './redux/favoritesSlice';
import ListDisplay from "./HymnListScreen";
import { FAB } from '@rneui/themed'
import { FontAwesome5 } from "@expo/vector-icons";


const deleted = <FontAwesome5 name="trash" size={25} color="#fff" />

class FavoritesScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={{backgroundColor: this.props.theme.backgroundColor}}>
                {this.props.list && this.props.list.length?
                    <View style={{backgroundColor: this.props.theme.backgroundColor, height: '100%'}}>
                   <ListDisplay 
                    data={this.props.list}
                    navigation={this.props.navigation}
                    favoritesScreen={true}
                    />
                    <FAB
                        visible={true}
                        size="large"
                        icon = {{name: 'delete', color: 'white'}}
                        color="red"
                        placement="right"
                        style={{ margin: 0, marginRight: 10 }}
                        onPress={() => this.props.clearAll()}
                    />
                </View>
                 :
                   <View style={{backgroundColor: this.props.theme.backgroundColor, height: '100%'}}>
                    <Text style={{fontStyle: 'italic', fontSize: 25, textAlign: 'center', color: this.props.theme.color}}>
                        No Favorites Added
                    </Text>
                   </View>
                }
            </View>
        )
    } 
}

const mapStateToProps = state => ({
    list: state.fList.value,
    theme: state.theme.value
})

const mapDispatchToProps = () => ({
    toggleFavorites,
    clearAll
})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(FavoritesScreen)