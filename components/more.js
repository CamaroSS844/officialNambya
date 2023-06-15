import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
  Alert,
  Share
} from 'react-native';

// import * as Sharing from 'expo-sharing'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {increment, decrement} from './redux/fontSlice'
import { toggleTheme } from './redux/themeSlice';

const socialColor = 'grey';
const socialSize = 18;

const onShare = async (title, message, url) => {
  const messageAndUrl = message.concat(`\n\n`).concat(url)
  try {
    const result = await Share.share(
      {
        title, 
        message: messageAndUrl,
      },
      {
        subject: title
      }
    )
  } catch (error) {
    console.log(`Error while sharing ${error}`)
  }
  
}

export class Menu extends React.Component {
  constructor(props){
    super(props)
    this.title = 'Hey there'
    this.message = 'I am using the Methodist Church Ndebele Hymn Book'
    this.url = 'coming soon on google play'
    this.state = {
      color: null,
      toggleFont: false,
      fontSize: this.props.size,
      visible: false,
      checked: null,
    }
  }

  ThemePopUp = () => {
    this.props.toggleTheme(this.props.theme)
  }

  popUP = (obj) =>
    Alert.alert(
      'Choose option',
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

  handleFont = (val) => {
      if (15 < this.state.fontSize && val == 'sub'){
        this.setState({fontSize: this.state.fontSize - 1})
        this.props.decrement()
      }
      else if (this.state.fontSize < 28 && val == 'add'){
        this.setState({fontSize: this.state.fontSize + 1})
        this.props.increment()
      }
      else  null
  }

  render() {
    return (
      <View style={{ ...this.props.theme, flex: 1 }}>
        <Text style={{...styles.title, ...this.props.theme}}>Settings</Text>

        <TouchableOpacity style={{...this.props.theme,...styles.touchable}} onPress={() => 
          this.setState({toggleFont: !this.state.toggleFont})}>
          <FontAwesome name="text-height" size={20} color={this.props.theme.color}/>
          <Text style={{...this.props.theme, ...styles.text}}>Font Size</Text>
        </TouchableOpacity>

        {this.state.toggleFont?
            <View style={{...styles.touchable, ...this.props.theme}}>
              <TouchableOpacity onPress={() => this.handleFont('sub')}>
                <Text style={{...this.props.theme,...styles.fontBar}}>-</Text>
              </TouchableOpacity>

              <Text style={{...styles.fontBar, fontSize: this.state.fontSize, ...this.props.theme}}>
                {`${this.props.size}`}
              </Text>
              
              <TouchableOpacity onPress={() => this.handleFont('add')}>
                <Text style={{...this.props.theme,...styles.fontBar}}>+</Text>
              </TouchableOpacity>
            </View>
            : null
          }

        <TouchableOpacity style={{...this.props.theme, ...styles.touchable}} 
          onPress={() => this.ThemePopUp()}>
          <FontAwesome5 name="adjust" size={20} color={this.props.theme.color}/>
          <Text style={{...this.props.theme, ...styles.text}}>Theme</Text>
        </TouchableOpacity>
        

        <Text style={{...styles.title, ...this.props.theme}}>About</Text>

        <TouchableOpacity style={styles.touchable}>
          <FontAwesome name="star-half-full" size={20} color={this.props.theme.color}/>
          <Text style={{...this.props.theme, ...styles.text}}>Rate Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{...this.props.theme, ...styles.touchable}} onPress={() => onShare(this.title, this.message, this.url)}>
          <FontAwesome name="share-alt" size={20} color={this.props.theme.color}/>
          <Text style={{...this.props.theme, ...styles.text}}>Share</Text>
        </TouchableOpacity>


        <View style={{ marginTop: 25 }}>
          <Text style={{...this.props.theme,...styles.about}}>For the Methodist Church in Zimbabwe</Text>
          <Text style={{...this.props.theme,...styles.about}}>V 1.0.0</Text>
          <Text style={{...this.props.theme,...styles.about}}>Translated by: Mr F Sialumba</Text>
          <Text style={{...this.props.theme,...styles.about}}>Developed by: Taboka F Sialumba</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable>
              <FontAwesome
                name="instagram"
                size={socialSize}
                color={socialColor}
                style={styles.social}
              />
            </Pressable>
            <Pressable>
              <FontAwesome
                name="facebook"
                size={socialSize}
                color={socialColor}
                style={styles.social}
              />
            </Pressable>
            <Pressable>
              <FontAwesome
                name="twitter"
                size={socialSize}
                color={socialColor}
                style={styles.social}
              />
            </Pressable>
            <Pressable>
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
    );
  }
}


const mapStateToProps = state => ({
    size: state.fontS.value,
    theme: state.theme.value
})

const mapDispatchToProps = () => ({
    increment,
    decrement,
    toggleTheme
})

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(Menu)


const styles = StyleSheet.create({
  light: {
    backgroundColor: 'white',
    color: 'black'
  },
  dark: {
    backgroundColor: 'black',
    color: 'white'
  },
  fontBar: {
    fontSize: 25,
    padding: 10
  },
  about: {
    textAlign: 'center',
    fontSize: 15,
  },
  social: {
    margin: 5,
  },
  touchable: {
    flexDirection: 'row',
    fontSize: 20,
    padding: 15,
    width: '100%',
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
});
