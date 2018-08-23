import React from 'react';
import PropTypes from 'prop-types';
import {Button, AsyncStorage, Text, View, ActivityIndicator,
    StatusBar,Image,FlatList, StyleSheet, TouchableOpacity}
from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import UserProfile from '../components/UserProfile';
import Logout from '../components/Logout';
import gql from "graphql-tag";
import {graphql, Query} from "react-apollo";
import Modal from 'react-native-modal';
import {AUTH_TOKEN} from "../constants/auth";





const GET_USER = gql`
    query ProfileUser($id: ID!){
        User(id: $id){
            id
            username
            firstName
            lastName
            email
            phone
            dateOfBirth
            imageUrl
            interests{title}
            workouts{title}
            memberships{title}
            classes{title}
            checkins{classes{title, time, category{title}, createdAt}}
        }
    }
`


let queryUserId;

class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible: false,
            currentUserToken: '',
            currentUserId: '',
            profileUpdate: false,
            isLoading: true,
            profileRefresh: false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <Logout buttonText={'Logout'}/>
            ),

        };
    };

    componentDidMount(){
        AsyncStorage.getItem("MyUserId").then( (dataId) => {
            queryUserId = JSON.parse(dataId);
            this.setState({currentUserId: queryUserId});
            console.log("queryUserId === " + queryUserId);
            return queryUserId;
        }).done();
        this.setState({isLoading: false});
    }

    _toggleModal = () =>
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    _profileRefresh = () => {
        this.props.data.refetch({id: queryUserId});
        this.setState({isLoading: false});
    }

    render(){
        if (this.state.isLoading) {
            return <View><Text>Loading...</Text></View>;
        }
        this.props.data.refetch({id: queryUserId});
        const {currentUserId, currentUserToken} = this.state;
        const { loading, error, User,  } = this.props.data;

        console.log('queryUserId:  ' + queryUserId);
        console.log("@render: currentUserId: " + currentUserId);

        if (loading) return <View style={{marginTop: 50}}><ActivityIndicator/></View>;
        if (error) {
            console.log("Profile Err: " + error);
            return (
                <View>
                    <Button
                        title={'retry'}
                        onPress={ () => this.props.data.refetch({id: queryUserId})}
                    />
                </View>
            )
        }
        return(
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#931414',
                alignItems: 'center', marginBottom: 100, paddingTop: 30,
            }}>

                <UserProfile
                    id={User.id}
                    username={User.username}
                    firstName={User.firstName}
                    lastName={User.lastName}
                    email={User.email}
                    dateOfBirth={User.dateOfBirth}
                    classes={User.checkins.map(({classes}) => classes.map((obj) => obj.title).join(', '))}
                    workouts={User.workouts.map(({title}) => title).join(', ')}
                    interests={User.interests.map(({title}) => title).join(', ')}
                />
                <TouchableOpacity
                    onPress={ () => this.props.data.refetch({id: queryUserId})}
                    style={{alignItems: 'center', paddingBottom: 60}}
                >
                    <Ionicons
                        name={"ios-refresh"} type={"Ionicons"} size={35} color={'midnightblue'}
                    />
                    <Text style={{color:'midnightblue'}}>Refresh</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
ProfileScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        User: PropTypes.object,
    }),
    currentUserId: PropTypes.string,
};

export default graphql(GET_USER,{
    options: ({props}) => {
        return{
            //skip: !queryUserId,
            fetchPolicy: 'network-only',
            variables: {id: queryUserId},
            //pollInterval: 1000,
        }
    }
})(ProfileScreen);


const styles = StyleSheet.create({

});