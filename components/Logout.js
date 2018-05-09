
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

    /*
    AsyncStorage.getItem("MyUserId").then( (dataId) => {
    queryUserId = dataId;
    this.setState((prevState) => {
    return { profileUpdate: !prevState.profileUpdate}})
}).done();
    */

    componentDidMount(){
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
                                AsyncStorage.removeItem(AUTH_TOKEN);
                                AsyncStorage.removeItem("MyUserId");
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