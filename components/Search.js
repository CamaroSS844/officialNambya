import React from "react"
import { View, TextInput, Text, StyleSheet } from "react-native"
import ListScreen from './HymnListScreen'
import { ContentData } from './names'
import { connect } from "react-redux"

class SearchScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hymnName: ''
        };
    }

    render(){ 
        return (
            <View style={{backgroundColor: this.props.theme.backgroundColor}}>
                <TextInput
                    style = {{
                        ...styles.searchBar,
                        borderColor: this.props.theme.borderColor,
                        color: this.props.theme.color
                    }}
                    placeholder="search by text or number"
                    placeholderTextColor= {this.props.theme.placeholderColor}
                    value={this.state.hymnName}
                    onChangeText = {hymnName => this.setState({ hymnName })} 
                />
                <Filter name={this.state.hymnName} navigation={this.props.navigation}/>
            </View>
        )
    }
} 


const mapStateToProps = state => ({
    list: state.fList.value,
    theme: state.theme.value
})

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(SearchScreen)

const Filter = ({name, navigation}) => {
    let data = FilterHelper(name)

    return (
        <ListScreen data={data} navigation={navigation} />
    )

}

const FilterHelper = name => {
    let list;
  if (parseInt(name)) {
    list = ContentData.filter((e) => e.key.includes(name));
  } else if (!parseInt(name)) {
    list = ContentData.filter(
        (e) => e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()
        )); 
  }
  return list;
}


const styles = StyleSheet.create({
    searchBar: {
        // borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        width: 300,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        padding: 5,
    }
})