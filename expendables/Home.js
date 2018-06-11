import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

const ShowDaily = () => (
    <Daily />
);
const ShowWeekly = () => (
    <Weekly />
);
const ShowMonthly = () => (
    <Monthly />
);

export default class Home extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Daily' },
            { key: 'second', title: 'Weekly' },
            { key: 'third', title: 'Monthly' },

        ],
    };
    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: ShowDaily,
                    second: ShowWeekly,
                    third: ShowMonthly
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}