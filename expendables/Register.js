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
        if(this.state.txtPassword1 != this.state.txtPassword2){
        Alert.alert("Error","Password does not match");
        }
        else
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
                <TextInput placeholder="Nick" onChangeText={(txtNick) => this.setState({ txtNick })} style={styles.input} />
                <TextInput placeholder="Email" onChangeText={(txtMail) => this.setState({ txtMail })} style={ styles.input} />
                <TextInput placeholder="Password " onChangeText={(txtPassword1) => this.setState({ txtPassword1 })} style={styles.input} />
                <TextInput placeholder="Password" onChangeText={(txtPassword2) => this.setState({ txtPassword2 })} style={styles.input} />
                <Button onPress={this.register} title="Create an account" />
                <Button onPress={this.cancel} title="Cancel" />
            </ View>
        )
    }

}
const styles = StyleSheet.create({
    input: {
        width:'90%',
       margin: 15,
        height: 40,
        borderColor: '#696969',
        borderWidth: 1
     },
})