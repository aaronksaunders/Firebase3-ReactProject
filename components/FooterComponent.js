import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    ListView,
    View
} from 'react-native';
class FooterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.toolbarButton}>User</Text>
                <Text style={styles.welcome}>I Am A Footer</Text>
                <Text style={styles.toolbarButton}>Add Item</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#81c04d',
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    welcome: {
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    },
    toolbarButton: {
        width: 80,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
});
module.exports = FooterComponent;
