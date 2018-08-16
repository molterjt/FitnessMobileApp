
import React from 'react';
import PropTypes from 'prop-types';
import {View, Button, Text, AsyncStorage} from 'react-native';
import { ApolloClient, withApollo, graphql, gql } from 'react-apollo';
import {AUTH_TOKEN} from "../constants/auth";
import {withNavigation} from 'react-navigation';


class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            auth: '',
        }

    }
    componentDidMount(){

        try{
            AsyncStorage.getItem(AUTH_TOKEN).then((value) => {
                if(value === null){
                    console.log('No authToken found in AsyncStorage')
                }
                else{
                    const authToken = JSON.parse(value);
                    this.setState({auth: authToken});
                    console.log("auth === " + authToken);
                    return authToken;
                }

            }).done();
        } catch (error){
            console.log(error);
        }
       /*
        try{
            const authToken = async() => await AsyncStorage.getItem(AUTH_TOKEN).then((value) => {
                return value;
            }).done();
            if(authToken !== null){
                console.log(authToken);
                this.setState({auth: authToken});
            } else{
                console.log('No authToken found in AsyncStorage')
            }
        } catch (error){
            console.log(error);
        }
        */
    }

     async removeItemsByKey(key) {
         try {
             await AsyncStorage.removeItem(key);
             return true;
         }
         catch(exception) {
             return false;
         }
    }

    render(){
        const auth = this.state;
        const {client} = this.props;
        return(
            <View>
                {auth ? (
                    <View>
                        <Button
                            title={'Logout'}
                            onPress={ () => {
                                this.removeItemsByKey(AUTH_TOKEN);
                                this.removeItemsByKey("MyUserId");
                                AsyncStorage.clear();

                                try {
                                    // clear apollo client cache/store
                                    if (client && typeof client.resetStore === 'function') {
                                        client.resetStore()
                                    }
                                } catch (e) {
                                    console.error('err client', e)
                                }
                                console.log(auth);
                                this.props.navigation.navigate('SignedOut');
                            }}
                            color={'blue'}
                        />
                    </View>
                ) : (
                    <Button
                        title={'Login'}
                        onPress={() => this.props.navigation.navigate('Login')}
                        color={'red'}
                    />
                )}
            </View>
        );
    }
}
Logout.propTypes = {
    client: PropTypes.instanceOf(ApolloClient),
}

export default withNavigation(Logout);