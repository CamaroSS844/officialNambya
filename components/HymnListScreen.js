import React from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert  } from "react-native";
import { connect } from 'react-redux'
import {clearAll, toggleFavorites} from './redux/favoritesSlice'

const ITEM_HEIGHT = 42
const index = 417

class RenderItem extends React.PureComponent{
    constructor(props){
        super(props)
        this.obj = this.props.obj.item
        this.key = this.props.obj.item.key
        this.name = this.props.obj.item.name
        this.nav = this.props.navigation
        this.handleLongPress = this.props.longPress
        this.HandlePress = this.props.handlePress
    }
    

    render(){
        return (
            <TouchableOpacity 
                style={{ color: this.props.theme.color, ...styles.Btn}} 
                onLongPress={() => this.handleLongPress(this.obj)}
                onPress={() => this.HandlePress(this.obj, this.key, this.name)}>
                <Text style={{
                    ...styles.BtnText,
                    ...styles.BtnKey,
                    color: this.props.theme.color}}>{this.key}</Text>
                <Text style={{...styles.BtnText,
                color: this.props.theme.color}}>{this.name}</Text>
            </TouchableOpacity>
        )
    }
}

//check favorites list
export function checkList(item, list=[]){
    //item is a full Contentdata object with key and name
    item = list.filter(e => e.key == item.key)
    if (!item.length) return true
    return false
}

export class listDisplay extends React.Component {
    constructor(props){
        super(props)
        this.handleLongPress = this.handleLongPress.bind(this)
    }

    toggleHeart = (item) => {
        if (checkList(item, this.props.list)) return false //return hearto
        // return heart
        return true
    }


    handlePress = (obj, key, name) => {
        this.props.navigation.push(
            'Hymn', {id: key-1, 
            toggleHeart: this.toggleHeart(obj),
            hymnName: name 
            })
    }

    handleLongPress = (obj) => {
        if (this.props.favoritesScreen) {
          return this.popUP(obj);
        }
        return null;
      }

    popUP = (obj) =>
    Alert.alert(
      'Remove hymn',
      `Do you want to remove hymn ${obj.key} from favorites`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () =>
            this.props.toggleFavorites(obj),
        },
      ]
    );

    render(){
        return (
            <FlatList 
                data={this.props.data}
                renderItem={
                    (obj) => 
                        <RenderItem obj={obj} 
                            navigation={this.props.navigation} 
                            toggleHeart={this.toggleHeart}
                            longPress={this.handleLongPress}
                            handlePress = {this.handlePress}
                            theme = {this.props.theme}
                        /> }
                keyExtractor={item => item.key}
                style={{...styles.list, backgroundColor: this.props.theme.backgroundColor}}
            />
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
)(listDisplay)


const styles = StyleSheet.create({
    Btn: {
        padding: 13,
        flexDirection: 'row',
        width: '100%'
    },
    BtnKey: {
       marginRight: 15 
    },
    BtnText: {
        fontSize: 16
    },
    list: {
        paddingBottom: 50
    }
})