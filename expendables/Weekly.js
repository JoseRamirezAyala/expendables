
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
                IncomeWeeklyArray: [],
                ExpenseWeeklyArray: [],
                TransactionsArray: [],
                fullArray: [],
                weeks: [],
            }
        this.getWeeklyTransactions = this.getWeeklyTransactions.bind(this);
        this.getWeeksInMonth = this.getWeeksInMonth.bind(this);
        this.filterWeeks = this.filterWeeks.bind(this);
        var income = 0;
        var expense = 0;
        var arrf = [];
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
    getWeeksInMonth = () => {
        this.state.weeks = [];
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

    }
    getWeeklyTransactions = () => {

        db.ref('transactions/').on('value', snapshot => {
            var array = [];
            var res = snapshot.val();
            for (item in res) {
                var transaction = res[item];
                if (this.state.userKey == transaction.user) {
                    array.push(transaction);
                }

            }
            this.state.fullArray = array;
            this.getWeeksInMonth();
            this.filterWeeks();
        })
    }
    filterWeeks = () => {
        this.state.TransactionsArray = [];
        for (item in this.state.weeks) {
            var week = this.state.weeks[item];
            for (item2 in this.state.fullArray) {
                var transaction = this.state.fullArray[item2];
                var date_split = transaction.date.split('-');
                if (new Date().getMonth() + 1 == parseInt(date_split[1])) {
                    var day = parseInt(date_split[2]);
                    if (day >= week.start && day < week.end) {
                        var week_transaction =
                            {
                                start: week.start,
                                end: week.end,
                                amount: parseFloat(transaction.amount),
                                income: transaction.income,
                                expende: transaction.expense,
                                week_index: item
                            };
                        this.state.TransactionsArray.push(week_transaction);


                    }
                }
            }

        }
        this.setState({ TransactionsArray: this.state.TransactionsArray });
    }
    eachWeeklyCard(w, i) {
        var range = w.start + " - " + w.end;
        if (w.income) {
            return <CardWeekly key={i} index={i} week={range} income={w.amount} expense={0}  ></CardWeekly>
        } else {
            return <CardWeekly key={i} index={i} week={range} income={0} expense={w.amount}  ></CardWeekly>
        }
    }
    render() {
        return (
            <View>

                <Text style={{ fontSize: 28 }}>Weekly</Text>
                {this.state.TransactionsArray.map(this.eachWeeklyCard)}
            </View>
        )
    }


}