
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
                fullArray: [],
                weeks: []
            }
        this.getWeeklyTransactions = this.getWeeklyTransactions.bind(this);
        this.getWeeksInMonth = this.getWeeksInMonth.bind(this);
    }
    componentWillMount() {
        this.getUser();
        this.getWeeklyTransactions();
        this.getWeeksInMonth();
    }
    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({ userKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }
    getWeeksInMonth = () => {
        var date = new Date();
        var weeks = [],
            firstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1),
            lastDate = new Date(date.getFullYear(), date.getMonth() + 2, 0),
            numDays = lastDate.getDate();

        var start = 1;
        var end = 7 - firstDate.getDay();
        while (start <= numDays) {
            weeks.push({ start: start, end: end });
            start = end + 1;
            end = end + 7;
            if (end > numDays)
                end = numDays;
        }
        this.state.weeks = weeks;
        console.log(this.state.weeks);
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