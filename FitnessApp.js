import React from 'react'
import {View, Text, ActivityIndicator, AsyncStorage} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {SwitchNavigator, withNavigation} from "react-navigation";
import TabTabNavigator from './router';
import LoginScreen from "./screens/LoginScreen";
import HomeStack from './router';
import {AUTH_TOKEN} from "./constants/auth";
import {createRootNavigator} from './router'



const isSignedIn = () => {
    return new Promise( (resolve, reject) => {
        AsyncStorage.getItem(AUTH_TOKEN)
            .then(res => {
                if(res !== null){
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};
class FitnessApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            checkSignIn: false,
        }
    }
    componentDidMount(){
        isSignedIn()
            .then(res => this.setState({
                signedIn: res,
                checkSignIn: true
            }))
            .catch(err => alert("Sign in Error"));
    }
    async componentWillMount() {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        if (token) {
            this.setState({ loggedIn: true });
        }
        return token;
    }
    render(){
        const {data} = this.props;
        const { checkedSignIn, signedIn } = this.state;
        if(data.loading){
            return <ActivityIndicator/>;
        }
        const Layout = createRootNavigator(signedIn);
        return <Layout/>;
    }
}

const LOGGED_IN_USER_QUERY = gql`
    query{
        loggedInUser{
            id
        }
    }
`

export default graphql(LOGGED_IN_USER_QUERY,{
    options: {fetchPolicy: 'network-only'}
}) (FitnessApp);
