import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
const goDaily = () => (
    <Daily />
);
const goWeekly = () => (
    <Weekly />
);
const goMonthly = () => (
    <Monthly />
);

export default class Transactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Daily' },
                { key: 'second', title: 'Weekly' },
                { key: 'third', title: 'Monthly' },
            ],
        }
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: goDaily,
                    second: goWeekly,
                    third: goMonthly,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}