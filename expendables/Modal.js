import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, Button } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class TransactionModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            checked : false,
            checked2 : false
        };
        this.setModalVisible = this.setModalVisible.bind(this);
    }


    setModalVisible() {
        this.props.setModalInvisible();
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
                <View style={{ marginTop: 22 }}>
                    <View>
                        <Text>Add Transaction </Text>
                        <TextInput placeholder="Enter Date" />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}> 
                            <CheckBox
                                title='Click Here'
                                checked={this.state.checked}
                            />
                            <CheckBox
                                title='Click Here'
                                checked={this.state.checked2}
                            />
                        </View>
                        <TextInput placeholder="Enter Date" />
                        <TextInput placeholder="Enter Date" />
                        <Button title="Ok" onPress={this.setModalVisible} />
                        <Button title="Cancel" onPress={this.setModalVisible} />
                    </View>
                </View>
            </Modal>
        );
    }
}