import { Slider ,Button} from 'react-native-elements'
import { View, Text, StatusBar,WebView, Image,TouchableOpacity,LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleSheet} from 'react-native';
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Connection from './connect.js'
import { ScreenOrientation, Video } from 'expo';

export default class Dpad extends Component {
    constructor() {
      super();
      this.state = {}
      this.connection = new Connection();
      this.flipL = this.flipL.bind(this)
      this.flipR = this.flipR.bind(this)
    }

    flipL(){
      Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
      console.log("flipped!")
    }
    flipR(){
      Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
    }

    render() {
      var connection = this.connection;
      return (
		<View style={{ position: 'absolute', right: 0, height: hp('50%') }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress= {()=>connection.input([1,1,1])}
			  title="Forward"
              //icon={<Ionicons name="md-checkmark-circle" size={32} color="green"/>}
              color="#ffffff"
              accessibilityLabel="Learn more about the forward button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.35)'}}
              style={{width: wp('10%')}}
            />
          </View>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
			<Button
              onPress= {()=>connection.input([1,0,1])}
              title="Left"
              color="#ffffff"
              accessibilityLabel="Learn more about the left turn button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.35)'}}
            />
			<Button
  		  	  onPress= {()=>connection.input([0,0,0])}
  		  	  title="Stop"
  		  	  color="#ffffff"
  		  	  accessibilityLabel="Learn more about the stop button"
  		  	  buttonStyle={{backgroundColor: 'rgba(0,0,0,0.35)'}}
  		    />
			<Button
              onPress= {()=>connection.input([1,1,0])}
              title="Right"
              color="#ffffff"
              accessibilityLabel="Learn more about the right turn button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.35)'}}
            />
            </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress= {()=>connection.input([1,0,0])}
              title="Reverse"
              color="#ffffff"
              accessibilityLabel="Learn more about the reverse button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.35)'}}
            />
          </View>
        </View>
      )
    }
}
