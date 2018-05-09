/*
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Button, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import { graphql, compose } from 'react-apollo'
import {withNavigation} from 'react-navigation';
import gql from 'graphql-tag'
import {AUTH_TOKEN} from "../constants/auth";
import Logout from '../components/Logout';
import signIn from '../App';


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
            <View>
                <View>{this.state.login ? <Text>'Login'</Text> : <Text>'SignUp'</Text>}</View>
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
                    <Text>user:{this.state.username}</Text>
                    </View>
                <View>
                    <Button
                        title={'Confirm'}
                        onPress={ () => this._confirm() }
                    />
                    <Text style={{alignSelf:'center'}}>
                    {this.state.login ? 'Create your account' : 'Already have account?'}
                    </Text>

                </View>
                <View>
                    {!this.state.login ?
                        <Button
                            title={'Login'}
                            onPress={ () => this.setState({login: !this.state.login})}
                        />
                        :
                        <Button
                            title={'SignUp'}
                            onPress={ () => this.setState({login: !this.state.login})}
                        />
                    }
                </View>
                <Logout/>
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
            this.props.navigation.navigate('Home', {itemId: id});
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
export default compose(
    graphql(SIGNUP_USER, {name: 'signupUser'}),
    graphql(LOGIN_USER, {name: 'authenticateUser'}),
)(withNavigation(Login));

const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        margin: 20,
        padding: 10,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    formButton: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20,
        margin: 20,
        width: '33%'
    },
});
*/