import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Text, TextInput,
    View, StyleSheet, ImageBackground,
    KeyboardAvoidingView, TouchableOpacity,AsyncStorage
} from 'react-native';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import Logout from '../components/Logout';
import {AUTH_TOKEN} from "../constants/auth";





class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: true,
            email: 'peebles@dog.com',
            password: 'intheshoe',
            username: '',
            emailError: false,
            passwordError: false,
            usernameError: false,
        }
        this._saveUserToken = this._saveUserToken.bind(this);
        this._saveUserId = this._saveUserId.bind(this);
        this._confirm = this._confirm.bind(this);
    }
    render(){
        const {email, password, username} = this.state;
        return(
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <ImageBackground
                    source={require('../assets/images/silver-background.jpg')}
                    style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center'}}
                    resizeMode='cover'
                >
                    <View style={{marginTop: 40}}>
                        <View style={styles.header}>
                            {this.state.login ?
                                <Text style={styles.headerText}>
                                    Login
                                </Text> : <Text style={styles.headerText}>Register</Text>}
                        </View>
                        <View>
                            {!this.state.login && (
                                <TextInput
                                    value={this.state.username}
                                    onChangeText={ (username) => this.setState({username})}
                                    type={'text'}
                                    placeholder={'Choose your username'}
                                    style={styles.textInput}
                                    autoCapitalize={'none'}
                                    underlineColorAndroid={'transparent'}
                                    autoCorrect={false}
                                />
                            )}
                            <TextInput
                                value={this.state.email}
                                onChangeText={ (email) => this.setState({email})}
                                type={"text"}
                                placeholder={'Your Email Address'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                underlineColorAndroid={'transparent'}
                                autoCorrect={false}
                            />
                            <TextInput
                                value={this.state.password}
                                onChangeText={ (password) => this.setState({password})}
                                type={"password"}
                                placeholder={'Enter a Password'}
                                secureTextEntry={true}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                            />

                        </View>
                        <TouchableOpacity
                            onPress={ () => this._confirm() }
                            style={styles.formButton}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 40}}>
                            <Text style={{alignSelf:'center'}}>
                                {this.state.login ? 'Need to create an account?' : 'Already have account?'}
                            </Text>
                            {!this.state.login ?
                                <Button
                                    title={'Login'}
                                    onPress={ () => this.setState({login: !this.state.login})}
                                    color={'blue'}
                                />
                                :
                                <Button
                                    title={'Register'}
                                    onPress={ () => this.setState({login: !this.state.login})}
                                    color={'blue'}
                                />
                            }
                        </View>
                    </View>
                </ImageBackground>
            </View>

        );
    }
    _saveUserToken = token => {
        AsyncStorage.setItem(AUTH_TOKEN, token);
    };
    _saveUserId = id => {
        AsyncStorage.setItem("MyUserId", id);
    };

    _confirm = async () => {
        const {username, email, password, login} = this.state;
        console.log(username, email, password, login);
        if(this.state.login){
            const result = await this.props.authenticateUser({
                variables: {email, password},
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
            });
            const {token} = result.data.signupUser;
            const {id} = result.data.signupUser;
            console.log('Token:' + token);
            console.log('UserId:' + id);
            this._saveUserToken(token);
            this._saveUserId(id);
            this.props.navigation.navigate('Login');
        }
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
        color: '#000',
    },
    formButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(155, 10, 2, 0.9)',
        padding: 20,
        marginTop: 40,
        marginBottom: 40,
        width: '33%',
        height: 15,
    },
    buttonText:{
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        alignContent:'center',
        justifyContent:'center',
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
});