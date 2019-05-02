import React from 'react';
import { View, Text, StatusBar,WebView, Image,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { ScreenOrientation } from 'expo';
import { Slider ,Button} from 'react-native-elements'
import YouTube from 'react-native-youtube'

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slider1: 50,
      slider2: 50
    }
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  static navigationOptions = {
    header: null
  }
  convertInteger1=(num)=>{
    num = Math.round(num)
    this.setState({slider1:num})
  }
  convertInteger2=(num)=>{
    num = Math.round(num)
    this.setState({slider2:num})
  }
  render() {
    //Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    return (
      <View style={{ flex: 1}}>
        <View>
          <View style={{width:300,height: 370, justifyContent:"center",position: 'absolute', left:-120}}>
            <Slider
              value={this.state.slider1}
              onValueChange={(value) => this.convertInteger1(value)}
              orientation="vertical"
              maximumValue={100}
              mininumValue={0}
              step={25}
              // animateTransitions= {true}
              // animationConfig={{duration:10000}}
              // animationType="spring"
            />
          </View>
        </View>
        <Image
          style={{width: 480, height: 370,position: 'absolute', left:90}}
          source={{uri: 'https://media.giphy.com/media/9sSqkImWazkJ2/giphy.gif'}}
        />
        <View style={{width:300,height: 370, justifyContent:"center",position: 'absolute', left:480 }}>
          <Slider
            value={this.state.slider2}
            onValueChange={(value) => this.convertInteger2(value)}
            orientation="vertical"
            maximumValue={100}
            mininumValue={0}
            step={25}
            // animateTransitions= {true}
            // animationConfig={{duration:10000}}
            // animationType="spring"
          />
        </View>
        <View style={{position: 'absolute', bottom:0, left:260}}>
          <TouchableOpacity>
            <Button
              title='Stop and Jump!'
            />
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
}
);
