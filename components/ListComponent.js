/**
 * 
 */
import React, { Component } from 'react';
import styles from '../styles';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    Navigator
} from 'react-native';

import MyListView from '../components/MyListView'


class ListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.setState({
            items: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        });
    }

    render() {
        return (
            <Navigator
                initialRoute = {{
                    'component': MyListView,
                    'name': 'MyListView',
                }}
                configureScene = {() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                } }
                renderScene = {(route, navigator) => {
                    return <route.component
                        route={route}
                        navigator={navigator}
                        items={this.state.items}
                        {...this.props}
                        />;
                } }
                />
        )
    }
}

module.exports = ListComponent;
