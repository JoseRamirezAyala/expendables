import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert,SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import {getFirebase} from './Firebase';
import Login from "./Login";
import Register from "./Register";
import Home from './Home';
var firebase = getFirebase();
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
    this.signOutUser = this.signOutUser.bind(this);
  }
  goToRegister() {
    this.setState({ registerWindow: true });
  }
  cancelRegister() {
    this.setState({ registerWindow: false });
  }
   signOutUser(){
      firebase.auth().signOut()
      .then(res => {
        this.setState({ logged: false })
      })
      .catch(function(error) {
        
        console.log(error);
      });
  }
  normalRegister(nick, email, password) {

    if (email != undefined && email != null && email != "") {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        console.log(res);
        this.storeUser(res.user.uid);
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
   async storeUser(user){
    try {
      await AsyncStorage.setItem('@CurrentUser:key', user);
    } catch (error) {
      // Error saving data
    }
  }
  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      this.setState({ logged: true });
      this.storeUser(res.user.uid);

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
      <SafeAreaView style={styles.safeArea}>
      <Home  signOutUser={this.signOutUser} />
      </SafeAreaView>
    );
  }
  registerMenu() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <Register cancelRegister={this.cancelRegister} normalRegister={this.normalRegister} />
    </SafeAreaView>
    )
  }
  notLoggedIn() {
    return (
      <SafeAreaView style={styles.safeArea} >
      <Login goRegister={this.goToRegister} login={this.login} />
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});
