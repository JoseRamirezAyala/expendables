import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                txtNick: "",
                txtMail: "",
                txtPassword1: "",
                txtPassword2: "",
            }
        this.register = this.register.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    register() {
        console.log("entro a esto");
        this.props.normalRegister(this.state.txtNick, this.state.txtMail, this.state.txtPassword1);
    }
    cancel() {
        this.props.cancelRegister();
    }
    render() {
        return (
            <View style={
                {
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Text>Register</Text>
                <TextInput placeholder="Nick" onChangeText={(txtNick) => this.setState({ txtNick })} style={{ width: "100%" }} />
                <TextInput placeholder="mail" onChangeText={(txtMail) => this.setState({ txtMail })} style={{ width: "100%" }} />
                <TextInput placeholder="Password " onChangeText={(txtPassword1) => this.setState({ txtPassword1 })} style={{ width: "100%" }} />
                <TextInput placeholder="Password" onChangeText={(txtPassword2) => this.setState({ txtPassword2 })} style={{ width: "100%" }} />
                <Button onPress={this.register} title="register" />
                <Button onPress={this.cancel} title="cancel" />
            </ View>
        )
    }

}