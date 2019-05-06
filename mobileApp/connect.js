/**
 * Handles connection with the Node.js server
 */
import React, { Component } from 'react';
import { AppRegistry, View, WebView, YellowBox, Alert } from 'react-native';
import socket from 'socket.io-client';

console.ignoredYellowBox = ['Remote debugger'];

export default class Connect extends Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
          'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);

        var alerted = (text) => {Alert.alert(
          'You have been '+ text + ' the Server!',
          'Alert',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )}
        // Connect to server
        //192.168.0.26
        this.socket = socket('192.168.43.58:3000', { transports: ['websocket']});
        //console.log("there is an error here:", this.socket)
        this.socket.on('connect', (socket,error) => {
          console.log("Connected to server");
          alerted('connected to');
        });
        this.socket.on('connect_error', (error) => {
          console.log("ERROR HERE!!!!!",error)
        });

        this.socket.on('disconnect', (reason) => {
          console.log(reason)
          alerted('disconnected from');
        });
        this.lastMotors = [0,0,0];
    }
    speech(text) {
          console.log("here comes the emit!:", text);
          this.socket.emit('text',text);
    }
    input(motors) {
        if (JSON.stringify(motors) != JSON.stringify(this.lastMotors)) {
            this.lastMotors = motors;
            console.log(motors);
            this.socket.emit('movement', {motors:motors});
        }
    }
}
