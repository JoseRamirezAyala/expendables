import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Tabbar from 'react-native-tabbar-bottom';
import Transactions from './Transactions';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "Transactions",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    // if you are using react-navigation just pass the navigation object in your components like this:
                    // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
                }
                {this.state.page === "Transactions" && <Transactions />}
                {this.state.page === "Stats" && <Text>Coming soon</Text>}
                {this.state.page === "Settings" && <Text>Coming soon</Text>}

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});