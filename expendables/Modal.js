import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, TextInput, Button, ListView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import { AsyncStorage } from 'react-native';
import {getFirebase} from './Firebase';
var firebase = getFirebase();
var db = firebase.database();
export default class TransactionModal extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            userKey: null,
            modalVisible: true,
            checked: true,
            checked2: false,
            date: "2016-05-15",
            txtAmount: "0.0",
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            category: "Click to choose a Category",
            categories: ["General", "Food", "School", "Transportation"]
        };

        this.setModalVisible = this.setModalVisible.bind(this);
        this.incomeChecked = this.incomeChecked.bind(this);
        this.expenseChecked = this.expenseChecked.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
    }

    ShowCurrentDate=()=>{
 
        var date = new Date().getDate();
        console.log(date);
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var full = year + '-' + month +'-' + date;
        this.setState({date:full})
   
       }
    componentWillMount(){
        this.getUser();
        this.ShowCurrentDate();
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    async getUser(){
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({userKey: value});
          } catch (error) {
            console.log("Error retrieving data" + error);
          }
        
    }
    addTransaction()
    {
        if(this.state.category === "Click to choose a Category"){

        }
        else {
                  db.ref().child('transactions').push().set({
                    amount: this.state.txtAmount,
                    date: this.state.date,
                    income: this.state.checked,
                    expense: this.state.checked2,
                    category: this.state.category,
                    user: this.state.userKey
                 });
                 this.setModalVisible;
                }
    }
    setModalVisible() {
        this.props.setModalInvisible();
    }
    incomeChecked() {
        this.setState({ checked: true, checked2: false });
    }
    expenseChecked() {
        this.setState({ checked: false, checked2: true });
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 200 }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    
                        <Text style={{ fontSize: 28 }}>Add Transaction </Text>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <Text>Amount</Text>
                        <TextInput style={styles.input} placeholder="Amount" onChangeText={(txtAmount) => this.setState({ txtAmount })} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <CheckBox onPress={this.incomeChecked}
                                title='Income'
                                checked={this.state.checked}
                            />
                            <CheckBox onPress={this.expenseChecked}
                                title='Expense'
                                checked={this.state.checked2}
                            />
                        </View>
                        <Text style={{ fontSize: 28 }} onPress={this.showActionSheet}>{this.state.category}</Text>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Which one do you like ?'}
                            options={this.state.categories}
                            onPress={(index) => { this.setState({ category: this.state.categories[index] }) }}
                        />
                        <Button title="Add" onPress={this.addTransaction} />
                        <Button title="Cancel" onPress={this.setModalVisible} />
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    input: {
        width:'90%',
        margin: 15,
        height: 40,
        borderColor: '#696969',
        borderWidth: 1
     },
})