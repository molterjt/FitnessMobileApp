import React from 'react';
import PropTypes from 'prop-types';
import {Button, AsyncStorage, Text, View, ActivityIndicator,
    StatusBar,Image,FlatList, StyleSheet, TouchableOpacity}
from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '../components/UserProfile';
import Logout from '../components/Logout';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
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
        }
    }
`

/*
 try {
    // clear apollo client cache/store
    if (this.props.client && typeof this.props.client.resetStore === 'function') {
        this.props.client.resetStore()
    }
} catch (e) {
    console.error('err client', e)
}
*/

/*
const UserDetails = graphql(GET_USER,{
    options: {
        variables: {id: 'cjfx3cy6fllio01734lu5cnf6'},
    }

})(({ data }) => {
    const { loading, User } = data;

    if (loading) return <View><Text>loading...</Text></View>;

    return (
            <UserProfile
                id={User.id}

                username={User.username}
                firstName={User.firstName}
                lastName={User.lastName}
                email={User.email}
                phone={User.phone}
                dateOfBirth={User.dateOfBirth}
                classes={User.classes.map(({title}) => title).join(', ')}
                workouts={User.workouts.map(({title}) => title).join(', ')}
                interests={User.interests.map(({title}) => title).join(', ')}
            />
    );
});
*/

let queryUserId;

try{
    AsyncStorage.getItem("MyUserId").then( (dataId) => {
        queryUserId = dataId;
        console.log("queryUserId === " + queryUserId);
        return queryUserId;
    }).done();
} catch (error) {
    console.log("MyUserId error" + error);
}

class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible: false,
            currentUserToken: '',
            currentUserId: '',
            profileUpdate: false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Edit', {userIdentity: queryUserId})}
                    title="Edit"
                    color="black"
                />
            ),
            headerLeft: (
                <Logout/>
            ),
        };
    };
    componentDidMount(){
        this.setState({currentUserId: queryUserId});
        console.log("currentUserId: " + this.state.currentUserId);
        console.log("queryUserId === " + queryUserId);
        this.forceUpdate();
    }

    _toggleModal = () =>
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });


    render(){
        const {currentUserId, currentUserToken} = this.state;
        const { loading, error, User,  } = this.props.data;

        console.log("@render: currentUserId: " + currentUserId);
        if (loading) return <View style={{marginTop: 50}}><ActivityIndicator/></View>;
        if (error) {
            console.log("Profile Err: " + error);
            return (
                <View>
                    <Text>
                        You have an Error
                    </Text>
                    <Button
                        title={'retry'}
                        onPress={ () => this.props.data.refetch()}
                    />
                </View>
            )
        }
        return(
            <View style={{ flex: 1, justifyContent: 'center',
                alignItems: 'center', marginBottom: 120, marginTop: 10,
            }}>

                <UserProfile
                    id={User.id}
                    username={User.username}
                    firstName={User.firstName}
                    lastName={User.lastName}
                    email={User.email}
                    dateOfBirth={User.dateOfBirth}
                    classes={User.classes.map(({title}) => title).join(', ')}
                    workouts={User.workouts.map(({title}) => title).join(', ')}
                    interests={User.interests.map(({title}) => title).join(', ')}
                />
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
            skip: !queryUserId,
            //fetchPolicy: 'network-only',
            variables: {id: queryUserId},
            pollInterval: 1000,
            refetch: {id: queryUserId}
        }
    }
})(ProfileScreen);


const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 120,
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
        flexDirection: 'column'
    }
});