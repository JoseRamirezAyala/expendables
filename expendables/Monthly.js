
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
export default class Monthly extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                modalVisible: false
            }
        this.addTransaction = this.addTransaction.bind(this);
        this.setModalInvisible = this.setModalInvisible.bind(this);

    }
    setModalInvisible() {
        this.setState({ modalVisible: false })
    }
    addTransaction() {
        this.setState({ modalVisible: true });
    }
    normal() {
        return (
            <View>
                <Button onPress={this.addTransaction} title="+" />
                <Text>Monthly</Text>
            </View>
        )
    }
    showModal() {
        return (
            <TransactionModal setModalInvisible={this.setModalInvisible} />
        )
    }
    render() {
        if (this.state.modalVisible) {
            return this.showModal();
        } else {
            return this.normal();
        }
    }


}