import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import Login from "./Login";
import Register from "./Register";
import Home from './Home';
var config = {
  apiKey: "AIzaSyAAqOZ2dmwB9OIU49xwTYpRpqmVQFQCUNw",
  authDomain: "expenses-1308a.firebaseapp.com",
  databaseURL: "https://expenses-1308a.firebaseio.com",
  projectId: "expenses-1308a",
  storageBucket: "expenses-1308a.appspot.com",
  messagingSenderId: "234807118736"
};
firebase.initializeApp(config);
var db = firebase.database();
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      {
        txtUser: "",
        txtPwd: "",
        logged: false,
        registerWindow: false
      }

    this.alert = this.alert.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.notLoggedIn = this.notLoggedIn.bind(this);
    this.registerMenu = this.registerMenu.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
    this.login = this.login.bind(this);
    this.normalRegister = this.normalRegister.bind(this);
    this.cancelRegister = this.cancelRegister.bind(this);
  }
  goToRegister() {
    this.setState({ registerWindow: true });
  }
  cancelRegister() {
    this.setState({ registerWindow: false });
  }

  normalRegister(nick, email, password) {

    if (email != undefined && email != null && email != "") {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        console.log(res);
        var user = {
          authid: res.user.uid,
          nick: nick,
          email: res.user.email
        }
        db.ref().child('users').push(user);

        this.setState({ logged: true });


      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(
          errorCode,
          errorMessage,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
        // ...
      });
    }
  }
  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      this.setState({ logged: true });
      db.ref('/users').once('value').then(res => {

      });
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(
        errorCode,
        errorMessage,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      // ...
    });
  }
  alert() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
  loggedIn() {
    return (
      <Home />
    );
  }
  registerMenu() {
    return (
      <Register cancelRegister={this.cancelRegister} normalRegister={this.normalRegister} />
    )
  }
  notLoggedIn() {
    return (
      <Login goRegister={this.goToRegister} login={this.login} />
    );

  }
  render() {
    if (this.state.logged) {
      return this.loggedIn();
    } else {
      if (this.state.registerWindow) {
        return this.registerMenu();
      } else {
        return this.notLoggedIn();
      }
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
