
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import TransactionModal from './Modal';
import CardMonthly from './CardMonthly';
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
            <Text style={{fontSize: 28}}>Monthly</Text>
            <CardMonthly />
            <CardMonthly />
            <CardMonthly />
        </View>
        )
    }


}