import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, TextInput, Button, ListView, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import { AsyncStorage } from 'react-native';
import { getFirebase } from './Firebase';
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
            comment: "",
            date: "2016-05-15",
            txtAmount: "0.0",
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            category: "Click to choose a Category",
            categories: ["Cancel","General", "Food", "School", "Transportation"]
        };

        this.setModalVisible = this.setModalVisible.bind(this);
        this.incomeChecked = this.incomeChecked.bind(this);
        this.expenseChecked = this.expenseChecked.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
    }

    ShowCurrentDate = () => {

        var MyDate = new Date()
        MyDateString = (
            MyDate.getFullYear()  + '-' 
            + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
            +('0' + MyDate.getDate()).slice(-2) )

        this.setState({ date: MyDateString })

    }
    componentWillMount() {
        this.getUser();
        this.ShowCurrentDate();
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    async getUser() {
        try {
            const value = await AsyncStorage.getItem('@CurrentUser:key');
            this.setState({ userKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }
    addTransaction() {
        if (this.state.category === "Click to choose a Category") {
            Alert.alert("Error", "Please choose a category");
        }
        if (this.state.txtAmount < 0 || this.state.txtAmount === '0.0') {
            Alert.alert("Error", "Please insert a valid amount");
        }
        else {
            db.ref().child('transactions').push().set({
                amount: this.state.txtAmount,
                date: this.state.date,
                income: this.state.checked,
                expense: this.state.checked2,
                category: this.state.category,
                comment: this.state.comment,
                user: this.state.userKey
            });
            this.props.setModalInvisible();
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
                <View style={{ marginTop: '12%' }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text style={{ fontSize: 28, marginBottom: '12%' }}>Add Transaction </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.input2} >Date</Text>
                            <DatePicker
                            style={styles.input}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2030-12-12"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.input2} >Amount</Text>
                            <TextInput style={styles.input} onChangeText={(txtAmount) => this.setState({ txtAmount })} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.input2} >Comment</Text>
                            <TextInput style={styles.input} onChangeText={(comment) => this.setState({ comment })} />
                        </View>
                       
                        <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.input2} >Category</Text>
                        <Text style={styles.input} onPress={this.showActionSheet}>{this.state.category}</Text>
                       <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Which one do you like ?'}
                            options={this.state.categories}
                            cancelButtonIndex={0}
                            onPress={(index) => { index == 0 ? '':this.setState({ category: this.state.categories[index] }) }}
                        />
                        </View>

                                                

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

                        <Button style={{ marginTop: '10%' }} title="Add" onPress={this.addTransaction} />
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
        width: '70%',
        height: 40,
        borderColor: '#696969',
        borderWidth: 1
    },
    input2: {
        width: '30%',
        textAlignVertical: 'center',
        height: 40,
        borderColor: '#696969',
        borderWidth: 1
    },
})