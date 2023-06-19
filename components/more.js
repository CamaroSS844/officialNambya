import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
  Alert,
  Share,
  Linking,
  ScrollView
} from "react-native";

// import * as Sharing from 'expo-sharing'
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { increment, decrement } from "./redux/fontSlice";
import { currentTheme, toggleTheme } from "./redux/themeSlice";
import FlipToggle from "react-native-flip-toggle-button";
import {socialColor, socialSize, whatsappUrl, contact, message, links }from './socials'

const onShare = async (title, message, url) => {
  const messageAndUrl = message.concat(`\n\n`).concat(url);
  try {
    const result = await Share.share(
      {
        title,
        message: messageAndUrl,
      },
      {
        subject: title,
      }
    );
  } catch (error) {
    console.log(`Error while sharing ${error}`);
  }
};

const openUrl = async (url) => {
  const isSupported = await Linking.canOpenURL(url);
  try {
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot open this url. Please try again later.`);
    }
  } catch (error) {
    console.log(error);
  }
};

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Hey there";
    this.message = "I am using the Methodist Church Ndebele Hymn Book";
    this.url = "coming soon on google play";
    this.state = {
      color: null,
      toggleFont: false,
      fontSize: this.props.size,
      visible: false,
      checked: null,
      padSize: 15,
      isActive: currentTheme(this.props.theme),
    };
  }

  ThemePopUp = () => {
    this.props.toggleTheme(this.props.theme);
  };

  popUP = (obj) =>
    Alert.alert(
      "Choose option",
      `Do you want to remove hymn ${obj.key} from favorites`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => this.props.toggleFavorites(obj),
        },
      ]
    );

  handleFont = (val) => {
    if (15 < this.state.fontSize && val == "sub") {
      this.setState({
        fontSize: this.state.fontSize - 1,
        padSize: this.state.padSize + 0.95,
      });
      this.props.decrement();
    } else if (this.state.fontSize < 28 && val == "add") {
      this.setState({
        fontSize: this.state.fontSize + 1,
        padSize: this.state.padSize - 0.95,
      });
      this.props.increment();
    } else null;
  };

  render() {
    return (
      <ScrollView style={{ ...this.props.theme, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            margin: 20,
          }}
        >
          <Text style={{ ...this.props.theme, ...styles.text }}>
            Dark theme
          </Text>
          <FlipToggle
            value={this.state.isActive}
            buttonWidth={50}
            buttonHeight={25}
            buttonRadius={50}
            sliderWidth={20}
            sliderHeight={20}
            sliderRadius={50}
            sliderOffColor={"white"}
            sliderOnColor={"white"}
            buttonOffColor={"#383838"}
            buttonOnColor={"#383838"}
            labelStyle={{ color: "black" }}
            onToggle={(newState) => {
              this.ThemePopUp();
              this.setState({ isActive: !this.state.isActive });
            }}
            onToggleLongPress={() => console.log("toggle long pressed!")}
          />
        </View>

        <View
          style={{
            ...styles.touchable,
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.handleFont("sub")}>
              <FontAwesome
                name="minus-square"
                size={25}
                color={this.props.theme.color}
                style={{ margin: 8 }}
              />
            </TouchableOpacity>

            <Text style={{ margin: 5, fontSize: 22, ...this.props.theme }}>
              {`${this.props.size}`}
            </Text>

            <TouchableOpacity onPress={() => this.handleFont("add")}>
              <FontAwesome
                name="plus-square"
                size={25}
                color={this.props.theme.color}
                style={{ margin: 8 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ ...styles.fontsize, padding: this.state.padSize }}
          >
            <Text style={{ fontSize: this.props.size, ...this.props.theme }}>
              Abc
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ ...styles.title, ...this.props.theme }}>About</Text>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => openUrl(whatsappUrl)}
        >
          <Feather
            name="message-square"
            size={25}
            color={this.props.theme.color}
          />
          <Text style={{ ...this.props.theme, ...styles.text }}>FeedBack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...this.props.theme,
            ...styles.touchable,
            borderTopWidth: 0,
          }}
          onPress={() => onShare(this.title, this.message, this.url)}
        >
          <Feather name="share-2" size={23} color={this.props.theme.color} />
          <Text style={{ ...this.props.theme, ...styles.text }}>Share</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 25 }}>
          <Text style={{ ...this.props.theme, ...styles.about }}>
            Methodist Church in Zimbabwe
          </Text>
          <Text style={{ ...this.props.theme, ...styles.about }}>
            Ndebele Hymnal V 1.2.0
          </Text>

          <Text style={{ ...this.props.theme, ...styles.about, marginTop: 25, fontSize: 16, fontWeight: '500' }}>
            Credits
          </Text>

          <View
            style={{ flexDirection: "column", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ ...this.props.theme, ...styles.about, marginTop: 10 }}
              >
                Translator
              </Text>
              <Text style={{ ...this.props.theme, ...styles.about }}>
                Mr F Sialumba
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable onPress={() => openUrl(links.Taboka.instagram)}>
                  <FontAwesome
                    name="instagram"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable >
                <Pressable onPress={() => openUrl(links.Taboka.twitter)}>
                  <FontAwesome
                    name="twitter"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
                <Pressable onPress={() => openUrl(links.Taboka.linkedin)}>
                  <FontAwesome
                    name="linkedin"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
              </View>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ ...this.props.theme, ...styles.about, marginTop: 10 }}
              >
                Developer
              </Text>
              <Text style={{ ...this.props.theme, ...styles.about }}>
                Taboka F Sialumba
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable onPress={() => openUrl(links.Taboka.instagram)}>
                  <FontAwesome
                    name="instagram"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable >
                <Pressable onPress={() => openUrl(links.Taboka.twitter)}>
                  <FontAwesome
                    name="twitter"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
                <Pressable onPress={() => openUrl(links.Taboka.linkedin)}>
                  <FontAwesome
                    name="linkedin"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
              </View>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ ...this.props.theme, ...styles.about, marginTop: 20 }}
              >
                Designer
              </Text>
              <Text style={{ ...this.props.theme, ...styles.about }}>
                Tawanda M Nyoni
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable onPress={() => openUrl(links.Tawanda.instagram)}>
                  <FontAwesome
                    name="instagram"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
                <Pressable onPress={() => openUrl(links.Tawanda.twitter)}>
                  <FontAwesome
                    name="twitter"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
                <Pressable onPress={() => openUrl(links.Tawanda.github)}>
                  <FontAwesome
                    name="github"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
                <Pressable onPress={() => openUrl(links.Tawanda.linkedin)}>
                  <FontAwesome
                    name="linkedin"
                    size={socialSize}
                    color={socialColor}
                    style={styles.social}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  size: state.fontS.value,
  theme: state.theme.value,
});

const mapDispatchToProps = () => ({
  increment,
  decrement,
  toggleTheme,
});

export default connect(mapStateToProps, mapDispatchToProps())(Menu);

const styles = StyleSheet.create({
  light: {
    backgroundColor: "white",
    color: "black",
  },
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  about: {
    textAlign: "center",
    fontSize: 15,
  },
  social: {
    margin: 5,
  },
  touchable: {
    flexDirection: "row",
    fontSize: 20,
    padding: 15,
    width: "90%",
    borderTopWidth: 1,
    borderColor: "#d3d3d3",
    marginLeft: 15,
  },
  title: {
    margin: 15,
    marginLeft: 30,
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  fontsize: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});