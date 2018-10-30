import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, AsyncStorage, Text, View, ActivityIndicator, ScrollView,
    TouchableOpacity, Dimensions, Modal, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import {Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfile from '../components/UserProfile';
import Logout from '../components/Logout';
import gql from "graphql-tag";
import {graphql, Query, compose} from "react-apollo";
import WorkoutRecord from '../components/WorkoutRecord';

import moment from 'moment';

const { width, height } = Dimensions.get("window");

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const GET_WORKOUT = gql`
    query($id:ID!){
        Workout(id:$id){
            id
            title
            type{title}
            description
            exercises{name, sets, reps, intensity, tempo, id}
            imageUrl
        }
    }
`;


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
            usersSets{
                workoutSets{
                    title
                    exercises{
                        name, sets, reps
                    }
                    exerciseSets{setName, repsHit, weightUsed, usersSets{firstName}}
                }
            }
            imageUrl
            interests{title}
            workouts{id, createdAt, title, days{name}, type{title}}
            memberships{title}
            classes{title}
            checkins(orderBy: createdAt_DESC, first:2){classes{id, title, category{title}, time, days{name}},timeCheck, createdAt}
        }
    }
`

const GET_WORKOUT_CHECKINS = gql`
    query($uId:ID, $load2:Int, $skip2:Int,){
        allCheckins(
            filter:{
                users_every: {
                    id: $uId
                }
                AND:{classes_none: {}}
            }
            orderBy: createdAt_DESC,
            first:$load2, skip:$skip2
        ){
            workouts{
                id,
                title,
                type{title},
                exercises{
                    name,
                    reps,
                    sets
                }
            }
            timeCheck
            createdAt
        }
    }
`;


let queryUserId;

// AsyncStorage.getItem("MyUserId").then( (dataId) => {
//     queryUserId = JSON.parse(dataId);
//     return queryUserId;
// }).done();

class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentUserToken: '',
            currentUserId: '',
            profileUpdate: false,
            isLoading: true,
            profileRefresh: false,
            showAllClassCheckins:false,
        };
        this.toggleClassCheckinsModal=this.toggleClassCheckinsModal.bind(this);
        this.jumpToUserCheckinHistory=this.jumpToUserCheckinHistory.bind(this);
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

    jumpToUserCheckinHistory = (userIdentity) => {
        this.props.navigation.navigate("CheckinHistory", {itemId: userIdentity});
    };
    toggleClassCheckinsModal(visible){
        this.setState({showAllClassCheckins: visible});
    }

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
        const myChecks = User;

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
                        // workouts={User.workouts.map(({title}) => title).join(', ')}
                        interests={User.interests.map(({title}) => title).join(', ')}
                    />

                    <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center', marginTop:10}}>
                        <TouchableOpacity
                            style={{alignItems:'center', flexDirection:'column', justifyContent:'center',marginTop:10}}
                            onPress={() => {
                                this.jumpToUserCheckinHistory(User.id);
                            }}
                        >

                            <Text style={{textAlign:"center", color: "#fff", marginRight: 0}}>All Workout & GroupFit Records</Text>
                            <MaterialCommunityIcons
                                name={"library-books"} type={"MaterialCommunityIcons"} size={35} color={'#fff'}
                                style={{textAlign:"center"}}
                            />
                        </TouchableOpacity>

                    </View>

                    <Query query={GET_WORKOUT_CHECKINS} variables={{uId:User.id , load2:1 , skip2:0 }} >
                        {({loading, error, data, fetchMore}) => {
                            if (loading) return <Text>"Loading ...."</Text>;
                            if (error) return <Text>`Error! ${error.message}`</Text>;
                            return (
                                <View>
                                    <View style={{borderRadius: 4, shadowOffset:{  width: 1,  height: 1,  }, shadowColor: '#CCC',backgroundColor: '#fff', margin:5, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>Latest Workout Completed</Text>
                                    </View>

                                    {data.allCheckins.map(({workouts, createdAt, timeCheck}) => (
                                        workouts.map((obj) => (
                                            <View style={{borderRadius: 4,
                                                shadowOffset:{  width: 1,  height: 1,  }, shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                                <View style={{flexDirection: 'row', display: 'flex'}}>
                                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#931414', marginBottom: 4}}>{obj.title}</Text>
                                                </View>
                                                <View style={{flexDirection:'row', marginTop: 5, marginBottom:5}}>
                                                    <Text style={{fontWeight: 'bold'}}>TimeStamp: </Text>
                                                    <Text style={{fontStyle: 'italic'}}>{moment(createdAt).format('M/D/Y')} at {moment(createdAt).format('hh:mm a')}</Text>
                                                </View>
                                                <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom: 5}}>
                                                    <Text style={{fontWeight: 'bold'}}>Type: </Text>
                                                    <Text style={{fontStyle: 'italic'}}>{obj.type.map(({title}) => title).join(', ')}</Text>
                                                </View>
                                                <View style={{borderWidth: 1, padding: 5}}>
                                                <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', marginTop:10}}>
                                                    <Text style={{width: '55%', fontWeight:'bold', paddingLeft: 10}}>Exercises:</Text>
                                                    <Text style={{width: '20%', fontWeight:'bold'}}>Sets:</Text>
                                                    <Text style={{width: '20%', fontWeight:'bold'}}>Reps:</Text>
                                                </View>
                                                {obj.exercises.map(({name, sets, reps}) => (
                                                    <View style={{flex:1, flexDirection:'row', flexWrap:'wrap',}}>
                                                        <Text style={{ fontStyle: 'italic', padding:3, width: '55%', paddingLeft:10}}>{name}</Text>
                                                        <Text style={{ fontStyle: 'italic', padding:3, width: '20%'}}>{sets}</Text>
                                                        <Text style={{fontStyle: 'italic', padding:3, width: '20%'}}>{reps}</Text>
                                                    </View>
                                                ))}
                                                </View>
                                                <View style={{marginBottom: 6}}/>
                                                <WorkoutRecord userId={User.id} timeCheck={timeCheck} workoutId={obj.id} workoutTitle={obj.title}/>
                                            </View>
                                        ))
                                    ))}

                                    <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center'}}>
                                        <TouchableOpacity
                                            style={{alignItems:'center', flexDirection:'column', justifyContent:'center'}}
                                            onPress={ () => {
                                                fetchMore({
                                                    variables:{
                                                        id: User.id,
                                                        load2: 1,
                                                        skip2: data.allCheckins.length
                                                    },
                                                    updateQuery: (previousResult, {fetchMoreResult}) => {
                                                        if (!fetchMoreResult){
                                                            console.log('NO FetchMore');
                                                            return previousResult;
                                                        }
                                                        console.log('trying to copy data');
                                                        return Object.assign({}, previousResult, {
                                                            allCheckins : [...previousResult.allCheckins, ...fetchMoreResult.allCheckins]
                                                        });
                                                    }
                                                })
                                            }}
                                        >

                                            <Text style={{textAlign:"center", color: "#fff", marginRight: 6}}>More</Text>
                                            <MaterialCommunityIcons
                                                name={"chevron-double-down"} type={"MaterialCommunityIcons"} size={35} color={'#fff'}
                                                style={{textAlign:"center"}}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            );
                        }}
                    </Query>
                    <View>
                        <View style={{borderRadius: 4, shadowOffset:{  width: 1,  height: 1,  }, shadowColor: '#CCC',backgroundColor: '#fff', margin:5, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                            <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>Latest GroupFit Class Checkin</Text>
                        </View>
                        {User.checkins.map(({createdAt, classes}) => (
                            classes.map((obj, index) => (
                                <View style={{borderRadius: 4,
                                    shadowOffset:{  width: 1,  height: 1,  },
                                    shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                    <View style={{flexDirection: 'row', display: 'flex'}}>
                                        <Text style={{fontWeight: 'bold', color: '#931414', fontSize: 16}}>{obj.title}</Text>
                                        <Text style={{position:'absolute', right: 0, fontSize: 12}}>{obj.time}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', display: 'flex'}}>
                                        <Text style={{fontWeight:'bold'}}>Type: </Text>
                                        <Text style={{fontStyle: 'italic'}}> {obj.category.map(({title}) => title).join(', ')}</Text>
                                        <Text style={{position:'absolute', right: 0, fontSize: 12}}>{obj.days.map(({name}) => name).join(', ')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', display: 'flex'}}>
                                        <Text style={{fontWeight:'bold'}}>TimeStamp: </Text>
                                        <Text style={{fontStyle: 'italic'}}>{moment(createdAt).format('M/D/Y')} at {moment(createdAt).format('hh:mm:ss a')}</Text>
                                    </View>
                                </View>

                            ))


                        ))}

                    </View>
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

export default compose(
    graphql(GET_USER,{
        options: ({props}) => {
            return{
                //skip: !queryUserId,
                fetchPolicy: 'network-only',
                variables: {
                    id: queryUserId,
                    load:10,
                    skip:0

                },
                //pollInterval: 1000,
            }
        },
        // name: 'ProfileUser'
    }),
    // graphql(
    //     GET_USER_CHECKINS, {
    //         options: ({props}) => {
    //             return{
    //                 //skip: !queryUserId,
    //                 fetchPolicy: 'network-only',
    //                 variables: {
    //                     id: queryUserId,
    //                     load: 2,
    //                     skip:0
    //                 },
    //                 //pollInterval: 1000,
    //             }
    //         }
    //     },
    //     {name: 'UserCheckins'})
) (ProfileScreen);

const styles = StyleSheet.create({

    rowColumn:{
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: WIDTH * .98,
        height: 80,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: '#cdcdcd',
        margin:2,
        padding: 0,
    },
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    mapContainer:{
        height: height*.6,
    },
    scrollView: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    /****************/
    profileButton:{
        alignItems: 'center',
        padding:1,
        fontWeight: 'bold',
        backgroundColor: "#277bfa",
        borderRadius: 15,
    },

    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    ModalInsideView:{
        alignItems: 'center',
        backgroundColor : "#fff",
        height: 600 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 3,
        borderColor: '#156DFA',
        opacity: "0.99",
        marginBottom: 30,
    },
    closeButton: {
        alignSelf: 'flex-end',
        position:'relative',
        justifyContent: "pull-right",
        top: 2,
        right: 7,
    },
    trainerDetailText: {
        color: "#fff",
        fontSize: 12
    },
    trainerDetailName:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});