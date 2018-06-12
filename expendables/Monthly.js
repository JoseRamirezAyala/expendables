
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import TransactionModal from './Modal';
export default class Monthly extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                modalVisible: false
            }

    }
    render() {
        return (
            <View>
            <Text>Monthly</Text>
        </View>
        )
    }


}