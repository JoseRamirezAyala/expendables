import * as React from 'react';
import { View, StyleSheet, Dimensions, Text,Button } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.logOut = this.logOut.bind(this);
    }
    logOut(){
        this.props.logOut();
    }
    render() {
        return (
            <View >
            <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title} >Settings</Text>
                    </View>

                    <Button title="Log out" onPress={this.logOut}/>
            </View>

            
        );
    }
}
const styles = StyleSheet.create({
    title: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 0,
        
    }
})