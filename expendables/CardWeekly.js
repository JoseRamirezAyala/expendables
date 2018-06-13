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
                <Text>{this.props.week}</Text>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Income</Text>
                    <Text style={{color : '#2427b4'}}>{this.props.income}</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Expense</Text>
                    <Text style={{color : '#FF0000'}}>{this.props.expense}</Text>
                </View>
            </View>
        )
    }
}