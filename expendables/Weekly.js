
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
                TransactionsArray: [],
                fullArray: [],
                finalTransactions: [],
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
        this.setState({ weeks: weeks });

    }
    getWeeklyTransactions = () => {

        db.ref('transactions/').once('value', snapshot => {
            var array = [];
            var res = snapshot.val();
            for (item in res) {
                var transaction = res[item];
                if (this.state.userKey == transaction.user) {
                    array.push(transaction);
                }

            }
            this.setState({ fullArray: array });
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
        console.log(this.state.TransactionsArray);
        this.setState({ TransactionsArray: this.state.TransactionsArray });
        this.finalArrayFilter();
    }
    finalArrayFilter() {
        var array = [];
        var week0 = {
            week: "",
            income: 0,
            expense: 0
        };
        var week1 = {
            week: "",
            income: 0,
            expense: 0
        };
        var week2 = {
            week: "",
            income: 0,
            expense: 0
        };
        var week3 = {
            week: "",
            income: 0,
            expense: 0
        };
        var week4 = {
            week: "",
            income: 0,
            expense: 0
        };
        for (item in this.state.TransactionsArray) {
            var transaction = this.state.TransactionsArray[item];
            var range = transaction.start + " - " + transaction.end;
            switch (parseInt(transaction.week_index)) {
                case 0:
                    week0.week = range;
                    if (transaction.income) {
                        week0.income += transaction.amount;

                    } else {
                        week0.expense += transaction.amount;
                    }
                    break;
                case 1:
                    week1.week = range;
                    if (transaction.income) {
                        week1.income += transaction.amount;

                    } else {
                        week1.expense += transaction.amount;
                    }
                    break;
                case 2:
                    week2.week = range;
                    if (transaction.income) {
                        week2.income += transaction.amount;

                    } else {
                        week2.expense += transaction.amount;
                    }
                    break;
                case 3:
                    week3.week = range;
                    if (transaction.income) {
                        week3.income += transaction.amount;

                    } else {
                        week3.expense += transaction.amount;
                    }
                    break;
                case 4:
                    week4.week = range;
                    if (transaction.income) {
                        week4.income += transaction.amount;

                    } else {
                        week4.expense += transaction.amount;
                    }
                    break;
            }
        }
        if(week0.week != "")
        {
            this.state.finalTransactions[0] = week0;
        }
        if(week1.week != "")
        {
            this.state.finalTransactions[1] = week1;
        }
        if(week2.week != "")
        {
            this.state.finalTransactions[2] = week2;
        }
        if(week3.week != "")
        {
            this.state.finalTransactions[3] = week3;
        }
        if(week4.week != "")
        {
            this.state.finalTransactions[4] = week4;
        }
        this.setState({ finalTransactions: this.state.finalTransactions });

    }
    eachWeeklyCard(w, i) {
        console.log(w);
        return <CardWeekly key={i} index={i} week={w.week} income={w.income} expense={w.expense}  ></CardWeekly>

    }
    render() {
        return (
            <View>

                <Text style={{ fontSize: 28 }}>Weekly</Text>
                {this.state.finalTransactions.map(this.eachWeeklyCard)}
            </View>
        )
    }


}