import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Text, TextInput, Alert, ActivityIndicator,
    View, StyleSheet, ImageBackground,
    KeyboardAvoidingView, TouchableOpacity,AsyncStorage
} from 'react-native';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import Logout from '../components/Logout';
import {AUTH_TOKEN} from "../constants/auth";
import validation from 'validate.js';






let queryUserId;

AsyncStorage.getItem("MyUserId").then( (dataId) => {
    queryUserId = dataId;
    console.log(JSON.stringify(dataId));
    console.log("queryUserId:" + queryUserId);
    return queryUserId;
}).done();


const constraints = {
    email:{
        presence: {
            message: '^Please enter an email address',
        },
        email: {
            message: '^Please enter a valid email address'
        },
    },
    password: {
        presence: {
            message: '^Please enter a password'
        },
        length: {
            minimum: 7,
            message: '^Your password must be at least 8 characters'
        }
    },
    username: {
        presence: {
            message: '^Please enter a username'
        },
        length: {
            minimum: 8,
            message: '^Your username must be at least 8 characters'
        },
    }
}

const validate = (fieldName, value) => {
    let formValues = {};
    formValues[fieldName] = value;

    let formFields = {};
    formFields[fieldName] = constraints[fieldName];

    const result = validation(formValues, formFields);
    if(result){
        return result[fieldName][0]
    }
    return null;
};


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            login: true,
            registerActivity: false,
            email: '',
            password: '',
            username: '',
            graphQL_Error: null,
            emailError: '',
            passwordError: '',
            usernameError: '',
        };
        this._saveUserToken = this._saveUserToken.bind(this);
        this._saveUserId = this._saveUserId.bind(this);
        this._confirm = this._confirm.bind(this);
        this.checkRegisterCredentials = this.checkRegisterCredentials.bind(this);
        this.checkLoginCredentials = this.checkLoginCredentials.bind(this);
        this.clearUserFormInputs = this.clearUserFormInputs.bind(this);
        this.showRegisterActivity = this.showRegisterActivity.bind(this);
        this.hideActivityIndicator = this.hideActivityIndicator.bind(this);
    }
    checkRegisterCredentials(){
        const {email, password, username, emailError, passwordError, usernameError} = this.state;
        if(email < 7 || emailError) return true;
        else if(password < 7 || passwordError) return true;
        else if(username < 7 || usernameError) return true;
        else return false;
    };
    checkLoginCredentials(){
        const {email, password, emailError, passwordError} = this.state;
        if(email < 7  || emailError) return true;
        else if(password < 7 || passwordError) return true;
        else return false;
    };
    clearUserFormInputs(){
        this.setState({
            email: '',
            password: '',
            username: ''
        });
    }
    showRegisterActivity(){
        this.setState({registerActivity: true});
    };
    hideActivityIndicator(){
        this.setState({registerActivity:false});
    }
    _saveUserToken = token => {
        AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
    };
    _saveUserId = id => {
        AsyncStorage.setItem("MyUserId", JSON.stringify(id));
    };

    _confirm = async () => {
        const {username, email, password, login} = this.state;
        console.log(username, email, password, login);

        if(this.state.login){
            const result = await this.props.authenticateUser({
                variables: {email, password},
            }).catch(error => {
                console.log(error.message);
                this.setState({graphQL_Error: error.message})
            });
            const {token} = result.data.authenticateUser;
            const {id} = result.data.authenticateUser;
            this._saveUserToken(token);
            this._saveUserId(id);
            console.log("Token: " +token);
            console.log("ID: " + id);


            //this.props.navigation.navigate('Home', {username});
            this.props.navigation.navigate('Intro', {itemId: id});
        } else {

            const result = await this.props.signupUser({
                variables: {email, password, username}
            }).catch(error => {
                console.log(error.message);
                this.setState({graphQL_Error: error.message})
            });

            const {token} = result.data.signupUser;
            const {id} = result.data.signupUser;
            Alert.alert('Good on ya! You have successfully registered. Now Login then update your Profile in Settings');
            console.log('Token:' + token);
            console.log('UserId:' + id);
            this._saveUserToken(token);
            this._saveUserId(id);


            this.props.navigation.navigate('Login');
        }
    };

    render(){
        const {login, email, password, username, emailError, passwordError, usernameError, graphQL_Error, registerActivity} = this.state;

        return(
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <ImageBackground
                    source={require('../assets/images/abstract-architectural.jpg')}
                    style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', marginTop: -20}}
                    resizeMode='cover'
                >
                    <View style={styles.overlay}/>
                    <View style={{marginTop: 10}}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Miami Rec Fitness</Text>
                        </View>
                        <View>
                            {!this.state.login && (
                                <View>
                                <TextInput
                                    value={this.state.username}
                                    onChangeText={ (username) => {
                                        this.setState({username});
                                        this.setState({usernameError: validate('username', username)})
                                    }}
                                    onBlur={() => this.setState({graphQL_Error: null})}
                                    type={'text'}
                                    accessibilityLabel={'Username field for Registration'}
                                    placeholder={'Choose your username'}
                                    style={styles.textInput}
                                    autoCapitalize={'none'}
                                    underlineColorAndroid={'transparent'}
                                    autoCorrect={false}
                                />
                                    {usernameError
                                        ? <Text style={{color: 'white', textAlign:'center'}}>{usernameError}</Text>
                                        : null
                                    }
                                </View>
                            )}

                            <TextInput
                                value={this.state.email}
                                onChangeText={ (email) => {
                                    this.setState({email});
                                    this.setState({emailError: validate('email', email)});
                                }}
                                onBlur={() => this.setState({graphQL_Error: null})}
                                type={"text"}
                                placeholder={'uniqueId@MiamiOH.edu'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                underlineColorAndroid={'transparent'}
                                autoCorrect={false}
                                label={'Email'}

                            />
                            {emailError
                                ? <Text style={{color: 'white', textAlign:'center'}}>{emailError}</Text>
                                : null
                            }
                            <TextInput
                                value={this.state.password}
                                onChangeText={ (password) => {
                                    this.setState({password});
                                    this.setState({passwordError: validate('password', password)});
                                }}
                                onBlur={() => this.setState({graphQL_Error: null})}
                                type={"password"}
                                placeholder={'Enter a Password'}
                                secureTextEntry={true}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                autoCorrect={false}

                            />
                            {passwordError
                                ? <Text style={{color: 'white', textAlign:'center'}}>{passwordError}</Text>
                                : null
                            }
                            {registerActivity && !passwordError && !emailError && !graphQL_Error && password > 6 && email > 6
                                ? <ActivityIndicator size="large" color={'#0a3efa'}/>
                                : null
                            }
                        </View>
                        {graphQL_Error
                            ? <Text style={{color: 'white', textAlign:'center', fontWeight: 'bold'}}>{graphQL_Error.substring(34).toUpperCase()}!!</Text>
                            : null
                        }
                        {!login
                            ?
                            (<TouchableOpacity
                                onPress={ () => {
                                    this.showRegisterActivity();
                                    this._confirm();
                                    this.clearUserFormInputs();

                                }}
                                style={styles.formButton}
                                disabled={this.checkRegisterCredentials()}

                            >
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>)
                            :
                            (<TouchableOpacity
                                onPress={ () => {
                                    this.showRegisterActivity();
                                    this._confirm();
                                    this.clearUserFormInputs();

                                }}
                                style={styles.formButton}
                                disabled={this.checkLoginCredentials()}

                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>)
                        }

                        <View style={{marginTop: 40}}>
                            <Text style={{color: '#fff', alignSelf:'center'}}>
                                {this.state.login ? 'Need to create an account?' : 'Already have account?'}
                            </Text>
                            {!this.state.login ?
                                <Button
                                    title={'Login'}
                                    onPress={ () => this.setState({login: !this.state.login})}
                                    color={'#0a3efa'}
                                    style={styles.screenSwitch}
                                />
                                :
                                <Button
                                    title={'Register'}
                                    onPress={ () => this.setState({login: !this.state.login})}
                                    color={'#0939da'}
                                    style={styles.screenSwitch}
                                />
                            }
                        </View>


                    </View>
                </ImageBackground>
            </View>

        );
    }

}

const SIGNUP_USER = gql`
    mutation SignUpUser($email: String!, $password: String!, $username: String!){
        signupUser(email:$email,password: $password, username: $username){
            id
            token
        }
    }
`

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!){
        authenticateUser(email: $email, password: $password){
            id
            token
            
        }
    }
`
const IS_LOGGED = gql`
    query{
        loggedInUser{
            id
        }
    }
`

export const LoginFlow =  compose(
    graphql(SIGNUP_USER, {name: 'signupUser'}),
    graphql(LOGIN_USER, {name: 'authenticateUser'}),
)(withNavigation(Login));


class LoginView extends React.Component{
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
    }
    render(){

        return(
            <View style={{flex: 1, backgroundColor: 'rgba(0, 10, 0, 0.0)'}}>
            <LoginFlow/>
            </View>
        );
    }
}

export default withNavigation(LoginView);

const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        margin: 20,
        padding: 10,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        backgroundColor: "#fff"
    },
    header:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,

    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#fff',
        shadowOffset:{  width: 1.0,  height: 1.0  },
        shadowColor: '#000',
        shadowOpacity: 2.0,
        shadowRadius: 4
    },
    formButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgba(155, 10, 2, 0.9)',
        backgroundColor: '#3072b2',
        padding: 20,
        marginTop: 40,
        marginBottom: 40,
        width: '33%',
        height: 15,
        borderWidth:1,
        borderRadius: 15,
        borderColor: '#fff',


    },


    buttonText:{
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        alignContent:'center',
        justifyContent:'center',
        shadowOffset:{  width: 1.0,  height: 1.0  },
        shadowColor: '#000',
        shadowOpacity: 2.0,
    },

    screenSwitch:{
        shadowOffset:{  width: 1.0,  height: 1.0  },
        shadowColor: '#fff',
        shadowOpacity: 2.0,
        shadowRadius: 4
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 'auto',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 4,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 1
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777'
    },
    instructor: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    blurb: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    location: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    thumbnail: {
        flex: 1,
        height: undefined,
        width: 90
    },
    rowText: {
        flex: 4,
        flexDirection: 'column',
        height: 'auto'
    },
    categoryThumb:{
        width: 220,
        height: 175,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'grey',
        opacity: 0.2
    }
});