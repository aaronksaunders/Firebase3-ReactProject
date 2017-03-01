/**
 * Sample React Native App for File upload
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

import FirebaseService from './service/firebaseService'

export default class RNFirebaseUploadApp extends Component {

  _doShowAlert(_title = "RNFirebaseUploadApp", _message) {

    // Works on both iOS and Android
    Alert.alert(_title, _message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )

  }

  _doPressAction() {
    const options = {
      title: 'Select Image',
      noData: true,
      quality: .8,
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    try {
      ImagePicker.showImagePicker(options, (response) => {
        //console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          this.setState({ image: { uri: response.uri }, data: response })

          FirebaseService.uploadFile(response).then((_resp) => {
            console.log("file uploaded successfully", _resp);
            this._doShowAlert("RNFirebaseUploadApp - Upload Success", _resp.downloadURL)
          }, (_error) => {
            console.log("Error Uploading File", _error);
            this._doShowAlert("RNFirebaseUploadApp - Upload Error", JSON.stringify(_error, null, 2))
          }).catch((_error) => {
            console.log("Error Uploading File", _error);
          })
        }
      });
    } catch (EE) {
      console.log(EE)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native - Firebase File Upload Example
        </Text>
        <Text style={[styles.welcome, { fontSize: 16 }]}>
          Uploading file using RNFetchBlob
        </Text>
        <View>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={() => { this._doPressAction() }}>
            <Text style={styles.buttonText}>
              GET PHOTO
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
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

  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    marginTop: 10,
    height: 32,
    width: 120,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('RNFirebaseUploadApp', () => RNFirebaseUploadApp);