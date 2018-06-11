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
                    <TextInput onChangeText={(txtMail) => this.setState({ txtMail })} style={{ width: '100%' }} placeholder="User" />
                    <TextInput onChangeText={(txtPassword) => this.setState({ txtPassword })} style={{ width: '100%' }} placeholder="password" />
                    <Button title="Login" onPress={this.login} />
                    <TouchableHighlight onPress={this.alert} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            style={{ width: 50, height: 50, }}
                            source={require('./fb.png')}
                        />
                    </TouchableHighlight>
                    <Button title="register" onPress={this.goToRegister} />
                </View>

            </View >
        )
    }
}