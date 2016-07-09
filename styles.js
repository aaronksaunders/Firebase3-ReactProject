const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
    },
    list_container: {
        flex: 1,
        backgroundColor: '#ff2f',
    },
    listview: {
        flex: 1,
    },
    item_title: {
        backgroundColor: '#fff',
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
        color: 'green'
    },
    item_desc: {
        backgroundColor: '#fff',
        paddingTop: 2,
        paddingBottom: 2,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 2,
        paddingBottom: 2,
    },
    liContainer: {
        flex: 1,
    },
    inputField: { height: 28, borderColor: 'gray', borderWidth: .5, width: 200, marginBottom: 8, padding: 4 },
    buttonText: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'center'
    },
    plainText: {
        fontSize: 12,
        color: 'black',
        alignSelf: 'center'
    },
    button: {
        marginTop: 10,
        height: 32,
        paddingLeft: 10,
        paddingRight: 10,
        // width: 60,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    liText: {
        color: '#333',
        fontSize: 16,
    },
});
module.exports = styles;