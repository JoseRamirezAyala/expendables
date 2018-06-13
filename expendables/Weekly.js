
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import TransactionModal from './Modal';
import CardWeekly from './CardWeekly';
import { getFirebase } from './Firebase';
var firebase = getFirebase();
var db = firebase.database();

export default class Weekly extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                userKey: null,
                modalVisible: false,
                weeklyArray: [],
                fullArray: []
            }
        this.getWeeklyTransactions = this.getWeeklyTransactions.bind(this);

    }
    componentWillMount() {
        this.getUser();
        this.getWeeklyTransactions();
    }
    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({ userKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }
    getWeeklyTransactions = () => {
        db.ref('transactions/').on('value', snapshot => {
            this.state.fullArray = [];
            var res = snapshot.val();
            for (item in res) {
                var transaction = res[item];
                if (this.state.userKey == transaction.user) {
                    this.state.fullArray.push(transaction);
                }
                
            }
            console.log(this.state.fullArray);
        })
    }
    render() {
        return (
            <View>

                <Text style={{ fontSize: 28 }}>Weekly</Text>
                <CardWeekly />
                <CardWeekly />
                <CardWeekly />
            </View>
        )
    }


}