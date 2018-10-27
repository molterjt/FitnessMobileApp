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
    query ProfileUser($id: ID!, $load: Int, $skip: Int){
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
            checkins(orderBy: createdAt_DESC, first:$load, skip:$skip){classes{title, time, category{title}}, workouts{id, title, type{title}, exercises{name, sets, reps}, days{name}},timeCheck, createdAt}
        }
    }
`

const GET_USER_CHECKINS = gql`
    query UserCheckins($uId:ID, $load:Int, $skip:Int){
        allCheckins(
            filter:{
                users_every: {
                    id: $uId
                }
            }
            orderBy: createdAt_DESC
            first:$load
            skip: $skip
        ){
            workouts{
                id
                title
                exercises{name, sets, reps}
                type{title}
            }
            classes{
                id
                title
                time
                category{title}
            }
            timeCheck
            createdAt
        }
    }
`;


const GET_WORKOUT_RECORD = gql`
    query WorkoutRecords($userId:ID, $timeCheck: String, $workout:ID){
        allExerciseSetses(
            filter: {
                usersSets_every:{id: $userId},
                workoutSets:{id: $workout},
                timeCheck_contains:$timeCheck
                
            }
            orderBy: setOrderNo_ASC){
            id
            createdAt
            usersSets{
                firstName
            }
            workoutSets{title, exercises{name, reps, sets}}
            exercises{name}
            setName
            repsHit
            weightUsed
            timeCheck
        }
    }
`;

class WorkoutRecords extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showWorkoutRecord: false
        };
        this.toggleWorkoutRecordModal = this.toggleWorkoutRecordModal.bind(this);
    }
    toggleWorkoutRecordModal(visible){
        this.setState({showWorkoutRecord: visible});
    }

    render(){


        return(
            <View>
                <TouchableOpacity
                    onPress={() => this.toggleWorkoutRecordModal(true)}
                    style={{alignItems:'center', justifyContent:'center', backgroundColor: '#277bfa', width: '30%', alignSelf:'center', borderRadius: 15}}
                >
                    <Ionicons
                        name={"ios-expand"}
                        size={28}
                        alt={"expand facility info"}
                        color={"#fff"}
                        style={{fontWeight: 'bold'}}
                    />
                </TouchableOpacity>
                <Query query={GET_WORKOUT_RECORD} variables={{userId: this.props.userId, timeCheck: this.props.timeCheck, workout: this.props.workoutId}}>
                    {({loading, error, data}) => {
                        if (loading) return <Text>"Loading ...."</Text>;
                        if (error) return <Text>`Error! ${error.message}`</Text>;
                            return (
                                <View>
                                    <Modal
                                        transparent={false} animationType={'none'}
                                        visible={this.state.showWorkoutRecord}
                                        onRequestClose={() => this.toggleWorkoutRecordModal(!this.state.showWorkoutRecord)}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.toggleWorkoutRecordModal(!this.state.showWorkoutRecord)
                                            }}
                                            style={{ marginTop:50, marginBottom: 5, marginLeft:2, flexDirection:'row' }}
                                        >
                                            <MaterialCommunityIcons name={"chevron-double-left"} size={40} color={"#277bfa"} />



                                        </TouchableOpacity>

                                        <ScrollView style={{flex: 1, justifyContent: 'space-evenly',}}>

                                            <View style={{flex:4, marginTop:5, marginBottom: 30, borderWidth:0, flexDirection:"column", justifyContent:'space-around', flexWrap: 'wrap'}}>
                                                <Text style={{fontSize: 16, padding: 8, textAlign: 'center', fontWeight: 'bold', color: '#931414', marginBottom: 5}}>{this.props.workoutTitle}</Text>
                                                <Text style={{fontSize: 12, padding: 1, textAlign: 'center',  color: '#000', marginBottom: 5}}>
                                                    {moment(this.props.timeCheck).format('M/D/Y h a')}
                                                </Text>
                                                {data.allExerciseSetses.map(({exercises, setName, repsHit, weightUsed}) => (
                                                    <View style={styles.rowColumn}>
                                                        {exercises.map(({name}) =>
                                                            <View
                                                                style={{
                                                                height: 80, borderWidth: 1, borderColor:'#000',
                                                                backgroundColor:'#29282A', width:'45%', justifyContent:'center'
                                                                }}
                                                            >
                                                                <Text style={{textAlign: 'center', color:'red', fontWeight:'bold'}}>{name}</Text>
                                                            </View>

                                                        )}
                                                        <View style={{flex:1}}>
                                                        <View style={{flexDirection:'row', padding:5, alignContent:'center', justifyContent:'center'}}>
                                                            <Text style={{fontWeight:'bold', textAlign:'center',width:'24%'}}>Set:</Text>
                                                            <Text style={{fontWeight:'bold',textAlign:'center',width:'36%'}}>Weight:</Text>
                                                            <Text style={{fontWeight:'bold',textAlign:'center',width:'24%'}}>Reps:</Text>
                                                        </View>
                                                        <View style={{flexDirection:'row', padding:5, alignContent:'center', justifyContent:'center'}}>
                                                        <Text style={{textAlign:'center',width:'24%'}}>{setName}</Text>
                                                        <Text style={{textAlign:'center',width:'36%'}}>{weightUsed} lbs</Text>
                                                        <Text style={{textAlign:'center',width:'24%'}}>{repsHit}</Text>
                                                        </View>
                                                        </View>




                                                        </View>


                                                ))}
                                            </View>


                                        </ScrollView>


                                    </Modal>
                                </View>
                            );
                    }}
                </Query>
            </View>
        );
    }
}



let queryUserId;

// AsyncStorage.getItem("MyUserId").then( (dataId) => {
//     queryUserId = JSON.parse(dataId);
//     return queryUserId;
// }).done();

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
                        // workouts={User.workouts.map(({title}) => title).join(', ')}
                        interests={User.interests.map(({title}) => title).join(', ')}
                    />
                    <View style={{borderRadius: 4,
                        shadowOffset:{  width: 1,  height: 1,  },
                        shadowColor: '#CCC',backgroundColor: '#fff', margin:5, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>Workout Completion History:</Text>
                    </View>
                    {User.checkins.map(({workouts, createdAt, timeCheck}) => (
                        workouts.map((obj, index) => (
                            <View style={{borderRadius: 4,
                                shadowOffset:{  width: 1,  height: 1,  },
                                shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                <View style={{flexDirection: 'row', display: 'flex'}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#931414', marginBottom: 4}}>{obj.title}</Text>
                                </View>
                                <View style={{flexDirection:'row', marginTop: 10, marginBottom:10}}>
                                    <Text style={{fontWeight: 'bold'}}>TimeStamp: </Text>
                                    <Text style={{fontStyle: 'italic'}}>{moment(createdAt).format('M/D/Y')} at {moment(createdAt).format('hh:mm a')}</Text>
                                </View>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                    <Text style={{fontWeight: 'bold'}}>Type: </Text>
                                    <Text style={{fontStyle: 'italic'}}>{obj.type.map(({title}) => title).join(', ')}</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', marginTop:10}}>
                                    <Text style={{width: '55%', fontWeight:'bold'}}>Exercises:</Text>
                                    <Text style={{width: '20%', fontWeight:'bold'}}>Sets:</Text>
                                    <Text style={{width: '20%', fontWeight:'bold'}}>Reps:</Text>
                                </View>
                                {obj.exercises.map(({name, sets, reps}) => (
                                    <View style={{flex:1, flexDirection:'row', flexWrap:'wrap',}}>
                                        <Text style={{ fontStyle: 'italic', padding:3, width: '55%'}}>{name}</Text>
                                        <Text style={{ fontStyle: 'italic', padding:3, width: '20%'}}>{sets}</Text>
                                        <Text style={{fontStyle: 'italic', padding:3, width: '20%'}}>{reps}</Text>
                                    </View>
                                ))}

                                <View style={{marginBottom: 6}}/>
                                <WorkoutRecords userId={User.id} timeCheck={timeCheck} workoutId={obj.id} workoutTitle={obj.title}/>
                            </View>
                        ))

                    ))}
                    <View sytle={{alignContent: 'center', justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                return this.props.data.fetchMore({
                                    variables:{
                                        id: queryUserId,
                                        load: 5,
                                        skip: 2
                                    },
                                    updateQuery: (previousResult, {fetchMoreResult}) => {
                                        if (!fetchMoreResult){
                                            return previousResult
                                        }

                                        if(fetchMoreResult.User === previousResult.User){
                                            return previousResult
                                        }

                                        return Object.assign({}, previousResult, {
                                            User : [...previousResult.User, ...fetchMoreResult.User]
                                        })
                                    }
                                })
                            }}
                        >
                            <Text style={{textAlign:"center"}}>More</Text>
                        </TouchableOpacity>
                    </View>





                    <View style={{borderRadius: 4,
                        shadowOffset:{  width: 1,  height: 1,  },
                        shadowColor: '#CCC',backgroundColor: '#fff', margin:5, marginTop: 10, padding:5, borderColor: '#000', borderWidth: 2, alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>GroupFit Class Check-In History:</Text>
                    </View>
                    {User.checkins.map(({classes, createdAt, timeCheck}) => (
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

export default compose(
    graphql(GET_USER,{
        options: ({props}) => {
            return{
                //skip: !queryUserId,
                fetchPolicy: 'network-only',
                variables: {
                    id: queryUserId,
                    load: 2,
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