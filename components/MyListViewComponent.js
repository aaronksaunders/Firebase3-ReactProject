
import React, { Component } from 'react';
import styles from '../styles';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    PixelRatio,
    Image,
    TouchableHighlight,
    Navigator
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import ImagePicker from 'react-native-image-picker';

var Blob = require('blob-polyfill')
var BlobBuilder = require('blob-polyfill')

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
        const leftButtonConfig = {
            title: 'Photo',

            handler2: () => {
                var _time = new Date().getTime()
                var fileRef = firebase.storage().ref('images/sample-text')
                var uploadTask = fileRef.put(new File(['this is a small amount of data'], 'sample-text.txt', { type: "text/plain" }), { type: "text/plain" });

                uploadTask.on('state_changed', function (snapshot) {
                    console.log('state_changed', snapshot);
                }, function (error) {
                    console.log("error", JSON.stringify(error));
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                })
            },
            handler: () => {
                ImagePicker.launchImageLibrary({}, (response) => {
                    console.log(response)
                    console.log("uploading blob")
                    var imgBlob = null;

                    imgBlob = new window.Blob([response.data], { type: 'image/jpeg' });
                    imgBlob.name = 'sample.jpg';

                    var fileRef = firebase.storage().ref('images/sample')
                    var uploadTask = fileRef.put(imgBlob, { type: "image/jpeg" });

                    uploadTask.on('state_changed', function (snapshot) {
                        console.log('state_changed', snapshot);
                    }, function (error) {
                        console.log("error", JSON.stringify(error));
                    }, function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        var downloadURL = uploadTask.snapshot.downloadURL;
                    })
                });
            }
        }
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
                    leftButton={leftButtonConfig}
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