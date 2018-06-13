
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import TransactionModal from './Modal';
import CardDaily from './CardDaily';
import { getFirebase } from './Firebase';
var firebase = getFirebase();
var db = firebase.database();
export default class Daily extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                modalVisible: false,
                fullArray: [],
                monthArray: [],
                total : 0
            }
        this.getDailyTransactions = this.getDailyTransactions.bind(this);
        this.eachDailyCard = this.eachDailyCard.bind(this);
    }
    componentWillMount() {
        this.getUser();
        this.getDailyTransactions();
    }
    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({ userKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }
    getDailyTransactions = () => {

        db.ref('transactions/').once('value', snapshot => {
            var array = [];
            var res = snapshot.val();
            for (item in res) {
                var transaction = res[item];
                if (this.state.userKey == transaction.user) {
                    array.push(transaction);
                }

            }
            this.state.fullArray = array;
            this.filterCurrentMonth();
        })
    }
    filterCurrentMonth = () => {
        var total = 0;
        for (item in this.state.fullArray) {
            var transaction = this.state.fullArray[item];
            var date_split = transaction.date.split('-');

            if (new Date().getMonth() + 1 == parseInt(date_split[1])) {
                console.log(transaction);
                if(transaction.income)
                {
                    total += parseFloat(transaction.amount);
                }else
                {
                    total -= parseFloat(transaction.amount);
                }
                this.state.monthArray.push(transaction);
            }
        }
        this.setState({total : total});
        this.setState({ monthArray: this.state.monthArray });
    }
    eachDailyCard(d, i) {
        if (d.income) {
            return <CardDaily color={'#2427b4'} key={i} index={i} day={d.date} category={d.category} amount={"$" + d.amount}  ></CardDaily>
        } else {
            return <CardDaily color={'#FF0000'} key={i} index={i} day={d.date} category={d.category} amount={"$" + d.amount}  ></CardDaily>
        }

    }
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',

            }}>

                <Text style={{ fontSize: 28 }}>Daily</Text>
                {this.state.monthArray.map(this.eachDailyCard)}
                <Text style={{paddingTop:50, fontSize: 20}}>Total: ${this.state.total}</Text>
            </View>
        )
    }


}