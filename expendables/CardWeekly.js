import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
export default class CardWeekly extends React.Component {
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
                <Text>Day Range</Text>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Income</Text>
                    <Text>------</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Expense</Text>
                    <Text>------</Text>
                </View>
            </View>
        )
    }
}