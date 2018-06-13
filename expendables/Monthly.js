
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert ,AsyncStorage} from 'react-native';
import TransactionModal from './Modal';
import { getFirebase } from './Firebase';
import CardMonthly from './CardMonthly';
var firebase = getFirebase();
var db = firebase.database();
export default class Monthly extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userKey: null,
            modalVisible: false,

                months: [

                ],
            
            }
            this.getMonthlyTransaction = this.getMonthlyTransaction.bind(this);

    }
    componentWillMount() {
        this.getUser();
        this.getMonthlyTransaction();
    }
    componentWillUnmount(){
    }
    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({ userKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }
    getMonthlyTransaction = () => {

        db.ref().child('transactions').on('value', snapshot => {
            var jan_in = 0, jan_out = 0
            var feb_in = 0, feb_out = 0
            var march_in = 0, march_out = 0
            var apr_in = 0, apr_out = 0
            var may_in = 0, may_out = 0
            var jun_in = 0, jun_out = 0
            var jul_in = 0, jul_out = 0
            var aug_in = 0, aug_out = 0
            var sept_in = 0, sept_out = 0
            var oct_in = 0, oct_out = 0
            var nov_in = 0, nov_out = 0
            var dec_in = 0, dec_out = 0
            this.state.months = [];
            var res = snapshot.val();
            for (item in res) {
                var transaction = res[item];
                var date = new Date(transaction.date)
                var year = new Date();
                if (this.state.userKey == transaction.user) {
      
                    if (year.getFullYear() === date.getFullYear()) {
                        switch (date.getMonth() + 1) {
                            case 1:
                                if (transaction.income) {
                                    jan_in += parseFloat(transaction.amount);
                                }
                                else {
                                    jan_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 2:
                                if (transaction.income) {
                                    feb_in += parseFloat(transaction.amount);
                                }
                                else {
                                    feb_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 3:
                                if (transaction.income) {
                                    march_in += parseFloat(transaction.amount);
                                }
                                else {
                                    march_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 4:
                                if (transaction.income) {
                                    apr_in += parseFloat(transaction.amount);
                                }
                                else {
                                    apr_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 5:
                                if (transaction.income) {
                                    may_in += parseFloat(transaction.amount);
                                }
                                else {
                                    may_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 6:
                                if (transaction.income) {
                                    jun_in += parseFloat(transaction.amount);
                                }
                                else {
                                    jun_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 7:
                                if (transaction.income) {
                                    jul_in += parseFloat(transaction.amount);
                                }
                                else {
                                    jul_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 8:
                                if (transaction.income) {
                                    aug_in += parseFloat(transaction.amount);
                                }
                                else {
                                    aug_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 9:
                                if (transaction.income) {
                                    sept_in += parseFloat(transaction.amount);
                                }
                                else {
                                    sept_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 10:
                                if (transaction.income) {
                                    oct_in += parseFloat(transaction.amount);
                                }
                                else {
                                    oct_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 11:
                                if (transaction.income) {
                                    nov_in += parseFloat(transaction.amount);
                                }
                                else {
                                    nov_out += parseFloat(transaction.amount);
                                }
                                break;
                            case 12:
                                if (transaction.income) {
                                    dec_in += parseFloat(transaction.amount);
                                }
                                else {
                                    dec_out += parseFloat(transaction.amount);
                                }
                                break;

                        }
                    }
                }


            }
            this.setState({months:this.state.months.concat({month:'January',income:jan_in,expense:jan_out})})
            this.setState({months:this.state.months.concat({month:'February',income:feb_in,expense:feb_out})})
            this.setState({months:this.state.months.concat({month:'March',income:march_in,expense:march_out})})
            this.setState({months:this.state.months.concat({month:'April',income:apr_in,expense:apr_out})})
            this.setState({months:this.state.months.concat({month:'May',income:may_in,expense:may_out})})
            this.setState({months:this.state.months.concat({month:'June',income:jun_in,expense:jun_out})})
            this.setState({months:this.state.months.concat({month:'July',income:jul_in,expense:jul_out})})
            this.setState({months:this.state.months.concat({month:'August',income:aug_in,expense:aug_out})})
            this.setState({months:this.state.months.concat({month:'September',income:sept_in,expense:sept_out})})
            this.setState({months:this.state.months.concat({month:'October',income:oct_in,expense:oct_out})})
            this.setState({months:this.state.months.concat({month:'November',income:nov_in,expense:nov_out})})
            this.setState({months:this.state.months.concat({month:'December',income:dec_in,expense:dec_out})})
            
        })

    }
    getMonthlyTransactionView(){
        return (
            <View>
                <Text style={{ fontSize: 28 }}>Monthly</Text>
                {this.state.months.map(r => <CardMonthly month={r.month} income={r.income} expense={r.expense} />)}
            </View>
        )
    }
    render() {
       return this.getMonthlyTransactionView()
    }


}