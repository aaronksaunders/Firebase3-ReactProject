

import React, { Component } from 'react';
import styles from '../styles';


import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    TextInput
} from 'react-native';


class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.props.username = ""
        this.props.password = ""
    }

    /**
     * login in the user with the credentials
     */
    _doPressAction() {

        console.log(this.state.username);
        console.log(this.state.password);

        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    render() {
        return (
            <View ref="loginView" style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <Text style={{ color: 'black', paddingTop: 20 }}>Email Login w/React Native</Text>
                <View>
                    <TextInput
                        style={[styles.inputField, { marginTop: 20 }]}
                        onChangeText={(username) => this.setState({ username }) }
                        value={this.state.username}
                        autoCapitalize="none"
                        placeholder="Enter User Name"
                        autoCorrect={false}
                        />
                    <TextInput
                        style={[styles.inputField]}
                        onChangeText={(password) => this.setState({ password }) }
                        password ={ true }
                        value={this.state.password}
                        autoCapitalize="none"
                        placeholder="Enter Password"
                        autoCorrect={false}
                        />
                </View>
                <View>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={() => { this._doPressAction() } }>
                        <Text style={styles.buttonText}>
                            LOGIN
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

module.exports = LoginComponent;