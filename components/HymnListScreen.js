import React from "react";
import { 
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { clearAll, toggleFavorites } from "./redux/favoritesSlice";

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
        onLongPress={() =>{
          toggleFavs = this.props.toggleFavorites
          handleLongPress(this.obj, this.props.favoritesScreen)}
        }
        onPress={() =>
          navToNewHymn(
            this.obj,
            this.key,
            this.props.list,
            this.props.navigation,
            this.name
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
export class listDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <FlatList
        data={this.props.data}
        removeClippedSubviews={true}
        initialNumToRender={10}
        getItemLayout={(data, index) => ({
          length: styles.Btn.height,
          offset: styles.Btn.height * index,
          index,
        })}
        renderItem={(obj) => (
          <RenderItem
            obj={obj}
            navigation={this.props.navigation}
            favoritesScreen={this.props.favoritesScreen}
            toggleFavorites = {this.props.toggleFavorites}
            list={this.props.list}
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
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.fList.value,
  theme: state.theme.value,
});

const mapDispatchToProps = () => ({
  toggleFavorites,
  clearAll,
});

export default connect(mapStateToProps, mapDispatchToProps())(listDisplay);

//Helper functions

//check favorites list
let toggleFavs;

const popUP = (obj) =>
    Alert.alert(
      "Remove hymn",
      `Do you want to remove hymn ${obj.key}    from favorites`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => toggleFavs(obj),
        },
      ]
    );

export function checkList(item, list = []) {
  //item is a full Contentdata object with key and name
  item = list.filter((e) => e.key == item.key);
  if (!item.length) return true;
  return false;
}

function toggleHeart(item, list) {
  if (checkList(item, /*this.props.list*/ list)) return true; //return heart meaning it is not in the list
  // return hearto meaning it is in the list
  return false;
}

export function navToNewHymn(obj, key, list, navigation, name) {
  //this.props.list list
  navigation.push("Hymn", { id: key - 1, toggleHeart: toggleHeart(obj, list), hymnName: name });
}

const handleLongPress = (obj, favoritesScreen) => {
  if (favoritesScreen) {
    return popUP(obj);
  }
  return null;
};

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