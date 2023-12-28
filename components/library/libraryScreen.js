import React from "react";
import { Text,
    FlatList,
    TouchableOpacity,
    StyleSheet } from "react-native";
import { connect } from "react-redux";
import { libraryList } from "./libraryList";



class LibraryListScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
        <FlatList
            data={libraryList}
            removeClippedSubviews={true}
            getItemLayout={(data, index) => ({
              length: styles.Btn.height,
              offset: styles.Btn.height * index,
              index,
            })}
            renderItem={(obj) => (
              <RenderItem
                obj={obj}
                navigation={this.props.navigation}
                theme={this.props.theme}
              />
            )}
            keyExtractor={(item) => item.key}
            style={{
              ...styles.list,
              backgroundColor: this.props.theme.backgroundColor,
              height: '100%',
              width: "100%",
              paddingTop: 10,
            }}
          />
        )
    } 
}




class RenderItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.obj = this.props.obj.item;
    this.key = this.props.obj.item.key;
    this.name = this.props.obj.item.name;
    this.nav = this.props.navigation;
  }

  render() {
    return (
      <TouchableOpacity
        style={{ color: this.props.theme.color, ...styles.Btn }}
        
        onPress={() =>
          navToNewPrayer(
            this.key,
            this.props.navigation
          )
        }
      >
        <Text style={{ ...styles.BtnText, color: this.props.theme.color }}>
          { this.key <= 418? this.key: null }          { this.key <= 418? this.name : null }
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.fList.value,
  theme: state.theme.value,
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(LibraryListScreen)

export function navToNewPrayer(key, navigation) {
  //this.props.list list
    navigation.push("Minamato Woku Bhabhatiza Bana", { id: key-1});
}

//styles
const styles = StyleSheet.create({
  Btn: {
    height: 50,
    padding: 10,
    margin: 1,
    marginLeft: 11,
    flexDirection: "row",
    width: "100%",
  },
  BtnKey: {
    marginRight: 8,
  },
  BtnText: {
    fontSize: 16,
  },
  list: {
    paddingBottom: 50,
  },
});