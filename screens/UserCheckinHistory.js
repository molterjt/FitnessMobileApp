import React from 'react';
import {
    AsyncStorage, Text, View, ActivityIndicator, ScrollView,
    TouchableOpacity, Dimensions, Alert
} from 'react-native';
import {Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import WorkoutRecord from '../components/WorkoutRecord';
import moment from 'moment';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

let queryUserId;

AsyncStorage.getItem("MyUserId").then( (dataId) => {
    queryUserId = dataId;
    console.log(JSON.stringify(dataId));
    console.log("queryUserId:" + queryUserId);
    return queryUserId;
}).done();


const DELETE_CHECKIN = gql`
    mutation deleteCheckin($checkID:ID!){
        deleteCheckin(id:$checkID){
            id
        }
    }
`


const GET_USER_CHECKIN_HISTORY = gql`
    query($id:ID){
        allCheckins(
            filter:{ users_every: {id: $id}}
            orderBy: createdAt_DESC,
        ){
            id
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
            classes{id, title, category{title}, time, days{name}}
            timeCheck
            createdAt
            users{id}
        }
    }
`

class UserCheckinHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workoutsVisible:false,
            workoutToggleButtonVisible: true,
            classesVisible:false,
            classesToggleButtonVisible: true,
        };
        this._deleteThisCheckin=this._deleteThisCheckin.bind(this);
        this._toggleClassesVisible=this._toggleClassesVisible.bind(this);
        this._toggleWorkoutsVisible=this._toggleWorkoutsVisible.bind(this);
    }

    _toggleWorkoutsVisible = (visible) => {
        this.setState({workoutsVisible: visible})
    };
    _toggleClassesVisible = (visible) => {
        this.setState({classesVisible: visible})
    };

    _deleteThisCheckin = async (checkID) => {
        const {userId} = this.state;
        await Alert.alert(
            'Alert',
            "Are you really, really sure you want to DELETE this record?  There's no take backs!",
            [
                {
                    text: 'DELETE', onPress: () => {
                        this.props.deleteCheckin({
                            variables: {
                                checkID: checkID,
                            }
                        });
                        console.log("This record as been Deleted. Goodbye.");
                        Alert.alert('You have successfully deleted your record!');
                        this.props.data.refetch([ GET_USER_CHECKIN_HISTORY, {variables: {id: this.props.navigation.state.params.itemId}}])
                    }
                },
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')}
            ],
            { cancelable: true },
        );
    };
    render(){
        const {error, loading, allCheckins } = this.props.data;
        const {workoutsVisible,classesVisible, workoutToggleButtonVisible, classesToggleButtonVisible} = this.state;

        if(loading){
            return (<View style={{alignContent:'center', justifyContent:'center'}}><ActivityIndicator color={"#931414"} size={"large"}/></View>);
        }
        return(
                <ScrollView style={{flex: 1, justifyContent: 'space-evenly', marginBottom: 30}}>

                    <View style={{
                        borderRadius: 4,
                        shadowOffset: {width: 1, height: 1},
                        shadowColor: '#CCC',
                        backgroundColor: '#fff',
                        margin: 5,
                        padding: 5,
                        borderColor: '#000',
                        borderWidth: 2,
                        alignItems: 'center',
                    }}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>Workout Completion History</Text>
                    </View>
                    {workoutsVisible
                        ?
                        ( <View>
                            {allCheckins.map(({createdAt, workouts, timeCheck, users, id}) => (
                            workouts.map((obj, index) => (
                                <View style={{borderRadius: 4,
                                    shadowOffset:{  width: 1,  height: 1,  }, shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                    <TouchableOpacity
                                        accessible={true}
                                        accessibilityLabel={'Delete Check-in Record Instance Button'}
                                        accessibilityRole={'button'}
                                        style={{flexDirection:'row', marginBottom:2, position:'flex', justifyContent: 'flex-end'}}
                                        onPress={() => this._deleteThisCheckin(id)}
                                    >
                                        <Ionicons
                                            name={"ios-remove-circle-outline"} type={"Ionicons"} size={25} color={'black'} style={{position:'flex', justifyContent: 'flex-end'}}
                                        />
                                    </TouchableOpacity>
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
                                    <WorkoutRecord userId={users.id} timeCheck={timeCheck} workoutId={obj.id} workoutTitle={obj.title}/>
                                </View>
                            ))
                        ))}
                                <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center'}}>
                                    <TouchableOpacity
                                        accessible={true}
                                        accessibilityLabel={'Show Workout Completion History Button'}
                                        accessibilityRole={'button'}
                                        style={{alignItems:'center', flexDirection:'column', justifyContent:'center'}}
                                        onPress={ () => this._toggleWorkoutsVisible(!this.state.workoutsVisible)
                                        }
                                    >
                                        <Text style={{textAlign:"center", color: "#931414", marginRight: 6}}>Hide Workouts Records</Text>
                                        <MaterialCommunityIcons
                                            name={"chevron-double-up"} type={"MaterialCommunityIcons"} size={35} color={'#931414'}
                                            style={{textAlign:"center"}}
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        )
                        :
                        ( <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center'}}>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel={'Close Workout Completion History Button'}
                                    accessibilityRole={'button'}
                                    style={{alignItems:'center', flexDirection:'column', justifyContent:'center'}}
                                    onPress={ () => this._toggleWorkoutsVisible(!this.state.workoutsVisible)
                                    }
                                >
                                    <Text style={{textAlign:"center", color: "#931414", marginRight: 6}}>Show Workout Records</Text>
                                    <MaterialCommunityIcons
                                        name={"chevron-double-down"} type={"MaterialCommunityIcons"} size={35} color={'#931414'}
                                        style={{textAlign:"center"}}
                                    />
                                </TouchableOpacity>

                            </View>
                        )
                    }


                    <View style={{
                        borderRadius: 4,
                        shadowOffset: {width: 1, height: 1},
                        shadowColor: '#CCC',
                        backgroundColor: '#fff',
                        margin: 5,
                        padding: 5,
                        borderColor: '#000',
                        borderWidth: 2,
                        alignItems: 'center',
                    }}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 16}}>GroupFit Class Checkin History</Text>
                    </View>
                    {
                        classesVisible
                        ? (
                            <View>
                                {allCheckins.map(({createdAt, classes, id}) => (
                                    classes.map((obj, index) => (
                                        <View style={{borderRadius: 4,
                                            shadowOffset:{  width: 1,  height: 1,  },
                                            shadowColor: '#CCC',backgroundColor: '#eff4f4', margin:2, padding:5, borderColor: '#000', borderWidth: 2}}>
                                            <TouchableOpacity
                                                accessible={true}
                                                accessibilityLabel={'Delete Check-in Record Instance Button'}
                                                accessibilityRole={'button'}
                                                style={{flexDirection:'row', marginBottom:2, position:'flex', justifyContent: 'flex-end'}}
                                                onPress={() => this._deleteThisCheckin(id)}
                                            >
                                                <Ionicons
                                                    name={"ios-remove-circle-outline"} type={"Ionicons"} size={25} color={'black'} style={{position:'flex', justifyContent: 'flex-end'}}
                                                />
                                            </TouchableOpacity>
                                            <View style={{flexDirection: 'row', display: 'flex', marginTop:10}}>
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
                                <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center'}}>
                                    <TouchableOpacity
                                        accessible={true}
                                        accessibilityLabel={'Hide Group Fit Class Check-in History Button'}
                                        accessibilityRole={'button'}
                                        style={{alignItems:'center', flexDirection:'column', justifyContent:'center'}}
                                        onPress={ () => this._toggleClassesVisible(!this.state.classesVisible)
                                        }
                                    >
                                        <Text style={{textAlign:"center", color: "#931414", marginTop: 8}}>Hide GroupFit Records</Text>
                                        <MaterialCommunityIcons
                                            name={"chevron-double-up"} type={"MaterialCommunityIcons"} size={35} color={'#931414'}
                                            style={{textAlign:"center"}}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )

                        : (
                                <View sytle={{flexDirection:'row',alignContent: 'center', justifyContent:'center', alignSelf: 'center'}}>
                                    <TouchableOpacity
                                        accessible={true}
                                        accessibilityLabel={'Show Group Fit Class Check-in History Button'}
                                        accessibilityRole={'button'}
                                        style={{alignItems:'center', flexDirection:'column', justifyContent:'center'}}
                                        onPress={ () => this._toggleClassesVisible(!this.state.classesVisible)
                                        }
                                    >
                                        <Text style={{textAlign:"center", color: "#931414", marginTop: 8}}>Show GroupFit Records</Text>
                                        <MaterialCommunityIcons
                                            name={"chevron-double-down"} type={"MaterialCommunityIcons"} size={35} color={'#931414'}
                                            style={{textAlign:"center"}}
                                        />
                                    </TouchableOpacity>

                                </View>
                            )
                    }
                </ScrollView>
        );
    }
}

export default compose(
    graphql(GET_USER_CHECKIN_HISTORY, {
        options: ({navigation}) => {
            return {
                variables: {id: navigation.state.params.itemId}
            }
        }
    }),
    graphql(DELETE_CHECKIN, {name: 'deleteCheckin'})
)(UserCheckinHistory);

