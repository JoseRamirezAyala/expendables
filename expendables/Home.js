import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Tabbar from 'react-native-tabbar-bottom';
import ActionButton from 'react-native-action-button';
import Transactions from './Transactions';
import Settings from './Settings';
import TransactionModal from './Modal';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "Transactions",
        }
    this.addTransaction = this.addTransaction.bind(this);
    this.setModalInvisible = this.setModalInvisible.bind(this);
    this.logOut = this.logOut.bind(this);

}
setModalInvisible() {
    this.setState({ modalVisible: false })
}
addTransaction() {
    this.setState({ modalVisible: true });
}
logOut(){
    this.props.signOutUser();
}

    normal() {
        return (
            <View style={styles.container}>
                {
                    // if you are using react-navigation just pass the navigation object in your components like this:
                    // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
                }
                {this.state.page === "Transactions" && <Transactions />}
                {this.state.page === "Stats" && <Text>Coming soon</Text>}
                {this.state.page === "Settings" && <Settings logOut={this.logOut}/>}
                }/>}
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    style={styles.actionButton}
                    onPress={this.addTransaction}
                    offsetY = {100}
                    />
                <Tabbar
                    stateFunc={(tab) => {
                        this.setState({ page: tab.page })
                        //this.props.navigation.setParams({tabTitle: tab.title})
                    }}
                    activePage={this.state.page}
                    tabs={[
                        {
                            page: "Transactions",
                            icon: "cash",
                        },
                        {
                            page: "Stats",
                            icon: "stats"
                        },
                        {
                            page: "Settings",
                            icon: "settings",
                        }
                    ]}
                />
            </View>
        );
    }
    showModal() {
        return (
            <TransactionModal setModalInvisible={this.setModalInvisible} />
        )
    }
    render() {
        if (this.state.modalVisible) {
            return this.showModal();
        } else {
            return this.normal();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    actionButton: {
       
    }
});