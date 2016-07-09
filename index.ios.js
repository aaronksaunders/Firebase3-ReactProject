/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import LoginComponent from './components/LoginComponent'
import MyListViewComponent from './components/MyListViewComponent'


const firebase = require("firebase");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBb0yc3UWwQPy_dvkcRLThNfQZuNx9jZ-g",
  authDomain: "fir-starterapp.firebaseapp.com",
  databaseURL: "https://fir-starterapp.firebaseio.com",
  storageBucket: "fir-starterapp.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


const routes = [
  { title: 'LoginComponent', component: LoginComponent, index: 0 },
  { title: 'MyListViewComponent', component: MyListViewComponent, index: 1 },
];



class FBReactProject extends Component {

  constructor(props) {
    super(props);

    console.log("constructor run...");

    this.state = {
      loggedIn: false,
      items: []
    };

  }

  componentDidMount() {

    console.log("componentDidMount run...");
    var that = this

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        that.setState({ loggedIn: true });
        console.log("got user..", that.state.loggedIn);

        that.refs.navigator.push(routes[1])
      } else {
        // No user is signed in.
        console.log("no user..");
        that.setState({ loggedIn: false });

        that.refs.navigator.popToTop(0)
      }
    });

  }




  /**
   * login in the user with the credentials
   */
  _doPressAction() {

    var that = this;
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      // User is signed in.
      that.setState({
        loggedIn: false,
        items: []
      });
    }, function (error) {
      // An error happened.
    });
  }

  render() {

    return (
      <Navigator ref = 'navigator'
        style={{
          flex: 1
        }}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        configureScene = {() => {
          return Navigator.SceneConfigs.FloatFromRight;
        } }
        renderScene = {(route, navigator) => {
          return <route.component route={route}
            navigator={navigator} />;
        } }
        />
    )
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Welcome to React Native!
    //     </Text>
    //     <Text style={styles.instructions}>
    //       To get started, edit index.ios.js
    //     </Text>
    //     <View>
    //       <TouchableHighlight
    //         style={styles.button}
    //         underlayColor='#99d9f4'
    //         onPress={() => { this._doPressAction() } }>
    //         <Text style={styles.buttonText}>
    //           LOGOUT
    //         </Text>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    marginTop: 10,
    height: 32,
    width: 60,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('FBReactProject', () => FBReactProject);
