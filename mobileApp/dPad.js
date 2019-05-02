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
        <View style={{ width: wp('50%'), height: hp('50%')}}>
          <View style={{ flex: 1, justifyContent: 'space-evenly'}}>
            <Button
              onPress= {()=>console.log("hello!")}
              //icon={<Ionicons name="md-checkmark-circle" size={32} color="green"/>}
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,1)'}}
              style={{width: wp('10%')}}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'space-evenly', flexDirection:'row', alignItems: 'stretch'}}>
            <Button
              onPress= {()=>connection.input([1,0,1])}
              title="Turn left"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <Button
              onPress= {()=>connection.input([1,1,0])}
              title="Turn right"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <Button
              onPress= {()=>connection.input([0,0,0])}
              title="Stop"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-evenly'}}>
            <Button
              onPress= {()=>connection.input([1,0,0])}
              title="Backward"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <Button
              onPress= {()=>this.flipL()}
              title="FLIP LEFT"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <Button
              onPress= {()=>this.flipR()}
              title="FLIP RIGHT"
              color="#095fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
          </View>
        </View>
      )
    }
}
