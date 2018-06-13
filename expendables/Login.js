import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                txtMail: "",
                txtPassword: ""
            }
        this.goToRegister = this.goToRegister.bind(this);
        this.login = this.login.bind(this);
    }
    goToRegister() {
        this.props.goRegister();
    }
    login() {
        this.props.login(this.state.txtMail, this.state.txtPassword);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 250
            }}>
                <View style={
                    {
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image source={require('./user.png')} />
                    <TextInput onChangeText={(txtMail) => this.setState({ txtMail })} style={styles.input} placeholder="User" />
                    <TextInput onChangeText={(txtPassword) => this.setState({ txtPassword })} style={styles.input} secureTextEntry={true} placeholder="password" />
                    <Button title="Log-In" onPress={this.login} />
                    <Button title="Don't have an account yet? Click here to create one" onPress={this.goToRegister} />
                </View>

            </View >
        )
        
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width:'90%',
        margin: 15,
        height: 40,
        borderColor: '#696969',
        borderWidth: 1
     },
    safeArea: {
      flex: 1,
      backgroundColor: '#ddd'
    }
  });