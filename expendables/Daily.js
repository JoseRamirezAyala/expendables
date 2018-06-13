
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import TransactionModal from './Modal';
import CardDaily from './CardDaily';
export default class Daily extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                modalVisible: false
            }
    }


    render() {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                
              }}>

                <Text style={{fontSize: 28}}>Daily</Text>
                <CardDaily />
                <CardDaily />
                <CardDaily />
            </View>
        )
    }


}