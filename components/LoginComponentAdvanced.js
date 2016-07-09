import Firebase from 'firebase'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    WebView,
    Image,
    TextInput
} from 'react-native';


class LoginComponentAdvanced extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.props = {}

        // Fake that I have a browser window..
        window.location = {
            href: null
        }

        _onShouldStartLoadWithRequest = this._onShouldStartLoadWithRequest.bind(this)

    }

    componentDidMount() {

        // set this interval to check for me trying to redirect the window...
        var that = this
        that.inter = setInterval(function () {
            if (window.location && window.location.split) {

                // set the redirect on the url..
                var newLocation = window.location.split("redirectTo=null")[0]
                newLocation = newLocation + "redirectTo=https://auth.firebase.com/v2/clearlyinnovative-firebasestarterapp/auth/github/callback"

                // open the browser...
                that.setState({ url: newLocation })

                // clear the interval to stop waiting for the location to be set..
                clearInterval(that.inter)
            }
        }, 3000);


        this.props.fbRef.onAuth((_auth) => {
            console.log(_auth)
            this.setState({ auth: _auth })
        });
    }

    /**
     * work with the token returned to attempt to login into GitHub
     */
    _processTokenOrCode(_url) {

        var code = _url.split("code=")[1].split("&")[0]

        console.log(_url)

        fetch("https://github.com/login/oauth/access_token?",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "client_id": "2d2838a445a8c0681c15",
                    "client_secret": "39101055c1b37dea00f755943c860f7194fae944",
                    "code": code
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)

                // login to Firebase using the credential returned from GitHub
                this.props.fbRef.authWithOAuthToken("github", responseData.access_token,
                    function (error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                        }
                    });
            })
            // when don clear the url so the component can render the proper
            // login state UI
            .done(() => { this.setState({ url: null }) });
    }





    /**
    * login in the user with the credentials, gets the whole process 
    * started, [NOTE] probably can just construct the url myself?
    */
    _doGitHubLogin() {
        this.props.fbRef.authWithOAuthRedirect("github", function (error) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    }

    _gotoHomeScreen() {
        this.props.loginSuccess();
    }

    /**
     * login in the user with the credentials
     */
    _doEmailLogin() {
        console.log("in do press action")

        var that = this

        this.props.fbRef.authWithPassword({
            email: 'd@mail.com',
            password: 'password'
        }, function authHandler(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {

                // check to see if user exists, here is 
                // where you will add user to firebase
                var usersRef = that.props.fbRef.child('users/' + authData.uid)
                usersRef.once('value', function (snapshot) {
                    if (snapshot.hasChild("displayName")) {
                        console.log("user exists...")
                    } else {
                        console.log("user does not exists... ")
                    }
                }, function (_error) {
                    console.log("user does not exists... " + _error.message)
                    that.props.loginSuccess();
                });


            }
        });
    }

    onNavigationStateChange(navState) {

    }


    _onShouldStartLoadWithRequest(_event) {

        // check if i have the code I am looking for...
        // if so then close the window
        if (_event.url.indexOf("code=") !== -1) {
            console.log("_event.url", _event.url)
            this._processTokenOrCode(_event.url)
            return true
        }
        return true
    }

    _renderWebView() {

        return (
            <WebView
                style={{
                    height: 350,
                }}
                source={{
                    uri: this.state.url
                }}
                scalesPageToFit={false}
                javaScriptEnabled={true}
                startInLoadingState={false}
                getAuth
                onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this) }
                />
        )
    }

    _renderLoginView() {
        return (
            <View ref="loginView" style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <Text style={{ color: 'black', }}>Git Hub Login Hack w/React Native</Text>
                <View>
                    <TouchableHighlight
                        style={LoginComponentStyles.button}
                        underlayColor='#99d9f4'
                        onPress={() => { this._doGitHubLogin() } }>
                        <Text style={LoginComponentStyles.buttonText}>
                            LOGIN WITH GITHUB
                        </Text>
                    </TouchableHighlight>
                </View>
                <Text style={{ color: 'black', paddingTop: 20 }}>Email Login w/React Native</Text>

                <View>
                    <TextInput
                        style={[LoginComponentStyles.inputField, { marginTop: 20 }]}
                        onChangeText={(username) => this.props.username = username }
                        value={this.props.username}
                        />
                    <TextInput
                        style={[LoginComponentStyles.inputField]}
                        onChangeText={(password) => this.props.password = password }
                        password ={ true }
                        value={this.props.password}
                        />
                </View>
                <View>
                    <TouchableHighlight
                        style={LoginComponentStyles.button}
                        underlayColor='#99d9f4'
                        onPress={() => { this._doEmailLogin() } }>
                        <Text style={LoginComponentStyles.buttonText}>
                            LOGIN WITH EMAIL
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    _renderLoggedInView() {
        return (
            <View ref="loggedInView" style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <Text style={{ color: 'black', }}>
                    {this.state.auth && this.state.auth.uid}
                </Text>
                <Text style={{ color: 'black', }}>
                    {this.state.auth && (this.state.auth.auth.token.name || this.state.auth.auth.token.email) }
                </Text>
                <Image
                    style={{
                        width: 75,
                        height: 75,
                    }}
                    source={{ uri: (this.state.auth.github || this.state.auth.password).profileImageURL }}
                    />
                <View>
                    <TouchableHighlight
                        style={LoginComponentStyles.button}
                        underlayColor='#99d9f4'
                        onPress={() => { this._gotoHomeScreen() } }>
                        <Text style={LoginComponentStyles.buttonText}>
                            GO TO HOME SCREEN
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    render() {

        // if there is a url then show the webView which should
        // contain the GitHub website Authentication UI
        if (this.state.url) {
            return this._renderWebView()
        } else {
            // otherwise show the appropriate state related UI
            if (!this.state.auth) {
                return this._renderLoginView()
            } else {
                return this._renderLoggedInView()
            }
        }
    }
}

const LoginComponentStyles = StyleSheet.create({
    inputField: { height: 28, borderColor: 'gray', borderWidth: .5, width: 200, marginTop: 5, paddingLeft: 4, paddingRight: 4 },
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
    }
});

module.exports = LoginComponentAdvanced;

