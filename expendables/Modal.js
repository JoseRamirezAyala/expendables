import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, TextInput, Button, ListView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import {getFirebase} from './Firebase';
var firebase = getFirebase();
var db = firebase.database();
export default class TransactionModal extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            modalVisible: true,
            checked: true,
            checked2: false,
            date: "2016-05-15",
            txtAmount: "0.0",
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            category: "Choose Category",
            categories: ["General", "Food", "School", "Transportation"]
        };
        this.setModalVisible = this.setModalVisible.bind(this);
        this.incomeChecked = this.incomeChecked.bind(this);
        this.expenseChecked = this.expenseChecked.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }

    addTransaction()
    {
        
        db.ref().child('Transaction').push()
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
                        <TextInput style={{ width: '100%' }} placeholder="Amount" onChangeText={(txtAmount) => this.setState({ txtAmount })} />
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
                        <Button title="Add" onPress={this.setModalVisible} />
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
})