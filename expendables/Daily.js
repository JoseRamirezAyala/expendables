
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
export default class Daily extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {

            }
    }
    render() {
        return (
            <View>
                <Button title="+" />
                <Text>Daily</Text>
            </View>
        )
    }


}