'use strict';

import React, { Component } from 'react';
import styles from '../styles';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';

class ListDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: props.route.passProps
        }
    }
    render() {
        const leftButtonConfig = {
            title: 'Back',
            handler: () => {
                this.props.navigator.pop();
            },
        };
        const titleConfig = {
            title: 'List Detail Page',
        };
        return (
            <View style={styles.tabContent}>
                <NavigationBar
                    title={titleConfig}
                    leftButton={leftButtonConfig} />
                <Text style={styles.welcome}>
                    {JSON.stringify(this.state.itemData, null, 2) }
                </Text>
            </View>
        )
    }
}

class ListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight >
                <View style={styles.li}>
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}



class MyListViewComponent extends Component {

    constructor(props) {
        super(props);

        console.log("in MyListViewComponent");

        this.state = {
            navigator: props.navigator,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
    }

    componentDidMount() {
        firebase.database().ref().child('stuff').on('value', (snap) => {

            // get children as an array
            var stuff = [];
            snap.forEach((child) => {
                stuff.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(stuff)
            });

        });
    }

    render() {

        const rightButtonConfig = {
            title: 'Back',
            handler: () => {
                firebase.auth().signOut()
            },
        }
        const titleConfig = {
            title: 'Main List Page',
        }

        return (
            <View style={styles.list_container}  >
                <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig} />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => { return (<ListItem item={item} />) } }
                    enableEmptySections={true}
                    />
            </View>
        )
    }
}

module.exports = MyListViewComponent;