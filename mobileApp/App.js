import React from 'react';
import { View, Text, StatusBar,WebView, Image,TouchableOpacity,LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { ScreenOrientation, Video } from 'expo';
import { Slider ,Button} from 'react-native-elements'
import styled from "styled-components";
import YouTube from 'react-native-youtube'
import VertSlider from './slider.js'
import Slides from '@ptomasroos/react-native-multi-slider'
import PropTypes from 'prop-types';
import Connection from './connect.js'
import DPad from './dPad.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  static navigationOptions = {
    header: null
  }

  render() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
    //var connection = this.connection;
    return (
      <Overall>
      <WebView
      source={{uri:'http://google.com'}}
      style={{ width: wp('100%'), height: hp('100%'), position: 'absolute'}}
      />
      <DPad/>
      </Overall>
    );
  }
}

const Overall = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems:stretch;
  backgroundColor:transparent;
  justifyContent:flex-end;
`

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
}
);

/*<WebView
  source={{uri: 'https://google.com'}}
  style={{flex:10}}
  <View style={{position: 'absolute', bottom:0, left:260}}>
    <TouchableOpacity>
      <Button
        title='Stop and Jump!'
      />
    </TouchableOpacity>
  </View>
/>*/

/*
<Slides
  vertical={true}
  touchDimensions={{height: 50,width: 50,borderRadius: 15,slipDisplacement: 50}}
/>
*/

/*
<Video
  source={{ uri: 'http://192.168.43.58:8080/stream/video.h264' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={{ width: wp('100%'), height: hp('100%'), position: 'absolute'}}
/>
'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
*/
/*'http://192.168.43.58:8080/stream/video.h264'*/
