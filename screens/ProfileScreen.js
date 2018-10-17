import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, AsyncStorage, Text, View, ActivityIndicator, ScrollView,
    TouchableOpacity, Dimensions
} from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import UserProfile from '../components/UserProfile';
import Logout from '../components/Logout';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

import moment from 'moment';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



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
            workouts{title, days{name}, type{title}}
            memberships{title}
            classes{title}
            checkins(orderBy: createdAt_DESC){classes{title, time, category{title}}, workouts{id, title, type{title}, days{name}}, createdAt}
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
            <View style={{flex: 1, backgroundColor: '#931414', marginBottom: 0, paddingTop: 0}}>
                <View style={{width: WIDTH, backgroundColor: "#ebebeb", borderBottomColor: '#000', borderBottomWidth:1}}>
                    <TouchableOpacity
                        onPress={ () => this.props.data.refetch({id: queryUserId})}
                        style={{alignItems: 'center',}}
                    >
                        <Ionicons
                            name={"ios-refresh"} type={"Ionicons"} size={35} color={'blue'}
                        />
                        <Text style={{color:'midnightblue'}}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding: 5, paddingBottom:20, marginBottom: 10}}>
                    <UserProfile
                        id={User.id}
                        username={User.username}
                        firstName={User.firstName}
                        lastName={User.lastName}
                        email={User.email}
                        dateOfBirth={User.dateOfBirth}
                        workouts={User.workouts.map(({title}) => title).join(', ')}
                        interests={User.interests.map(({title}) => title).join(', ')}
                    />
                    <View style={{borderRadius: 4,
                        shadowOffset:{  width: 1,  height: 1,  },
                        shadowColor: '#CCC',backgroundColor: '#fff', margin:5, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>Workout Completion History:</Text>
                    </View>
                    {User.checkins.map(({workouts, createdAt}) => (
                        workouts.map((obj, index) => (
                            <View style={{borderRadius: 4,
                                shadowOffset:{  width: 1,  height: 1,  },
                                shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                <View style={{flexDirection: 'row', display: 'flex'}}>
                                    <Text style={{fontWeight: 'bold', color: '#931414'}}>{obj.title}</Text>
                                </View>
                                <Text style={{fontStyle: 'italic'}}>Type: {obj.type.map(({title}) => title).join(', ')}</Text>
                                <Text style={{fontStyle: 'italic'}}>Days: {obj.days.map(({name}) => name).join(', ')}</Text>
                                <Text style={{fontStyle: 'italic'}}>TimeStamp: {moment(createdAt).format('M/D/Y')} at {moment(createdAt).format('hh:mm:ss a')}</Text>

                            </View>
                        ))


                    ))}
                    <View style={{borderRadius: 4,
                        shadowOffset:{  width: 1,  height: 1,  },
                        shadowColor: '#CCC',backgroundColor: '#fff', margin:5, marginTop: 10, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>GroupFit Class Check-In History:</Text>
                    </View>
                    {User.checkins.map(({classes, createdAt}) => (
                        classes.map((obj, index) => (
                            <View style={{borderRadius: 4,
                                shadowOffset:{  width: 1,  height: 1,  },
                                shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                <View style={{flexDirection: 'row', display: 'flex'}}>
                                    <Text style={{fontWeight: 'bold', color: '#931414'}}>{obj.title}</Text>
                                    <Text style={{position:'absolute', right: 0, fontSize: 12}}>{obj.time}</Text>
                                </View>

                                <Text style={{fontStyle: 'italic'}}>Type: {obj.category.map(({title}) => title).join(', ')}</Text>
                                <Text style={{fontStyle: 'italic'}}>TimeStamp: {moment(createdAt).format('M/D/Y')} at {moment(createdAt).format('hh:mm:ss a')}</Text>
                            </View>
                        ))
                    ))}

                </ScrollView>
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

