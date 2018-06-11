import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, Button } from 'react-native';

export default class TransactionModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
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