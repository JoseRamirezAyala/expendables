import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {

            }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Hola: {this.props.nick}</Text>
            </View>
        )
    }
}