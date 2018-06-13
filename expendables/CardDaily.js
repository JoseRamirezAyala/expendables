import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
export default class CardDaily extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#696969',
                borderWidth: 1
            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <Text>Date</Text>
                    <Text>Category</Text>
                </View>
                <View>
                    <Text>Amount</Text>
                </View>
            </View>
        )
    }
}

