import React from 'react';
import {Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom, SwitchNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.jsonimport {Icon} from 'react-native-elements';




import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import FacilitiesScreen from './screens/FacilitiesScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditScreen from './screens/EditProfileScreen';
import EventsScreen from './screens/EventsScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import SingleClassDetailScreen from './screens/SingleClassDetailScreen';
import CategoryScreen from './screens/CategoryScreen';
import ExerciseDetail from './screens/ExerciseDetail';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from "./screens/LoginScreen";
import InstructorScreen from "./screens/InstructorScreen";
import TrainerScreen from './screens/TrainerScreen';

/*
const headerStyle = {
    marginTop: Platform.OS  === "android" ? StatusBar.currentHeight: 0
};
*/
const HomeStack = StackNavigator(
    {

        Home: {
            screen: HomeScreen,
            navigationOptions:{
                title: 'Welcome',
            },
        },
        Events: {
            screen: EventsScreen,
            path: '/Events',
            navigationOptions:{
                title: 'Events',
            },
        },
        Workouts: {
            screen: WorkoutScreen,
            path: '/workouts',
            navigationOptions:{
                title: 'Workout',
            },
        },
        ExerciseDetail: {
            screen: ExerciseDetail,
            path:'/workouts/exercise',
        },
        Intro:{
            screen: IntroScreen,
            navigationOptions:{
                header: null,
            }
        },
    },
    {initialRouteName: 'Home'},
);

const ProfileStack = StackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            path: '/',
            navigationOptions:{
                title: 'Profile',
            },
        },
        Details: {
            screen: DetailsScreen,
        },
        Edit: {
            screen: EditScreen,
            path: '/profile',
            navigationOptions:{
                title: 'Edit Profile',
            },
        }
    }
);
const GFStack = StackNavigator(
    {
        Schedule: {
            screen: ScheduleScreen,
            path: '/',
            navigationOptions:{
                title: 'Group Fitness Schedule',
            },
        },
        ClassDetail: {
            screen: SingleClassDetailScreen,
        },
        Instructor:{
            screen: InstructorScreen
        },
        CategoryDetail: {
            screen: CategoryScreen
        },

    }
);
const FacilityStack = StackNavigator(
    {
        Facility: {
            screen: FacilitiesScreen,
            path: '/',
            navigationOptions:{
                header: null,
            },
        },
        Details: {screen: DetailsScreen},

    }
);

const PersonalFITStack = StackNavigator(
    {
        Trainer:{
            screen: TrainerScreen,
            navigationOptions:{
                header: null,
            },
        },
        Workouts: {
            screen: WorkoutScreen,
            path: '/workouts',
            navigationOptions:{
                header: null,
            },
        },
        ExerciseDetail: {
            screen: ExerciseDetail,
            path:'/workouts/exercise',
        },
    }
);

export const TabTabNavigator = TabNavigator(
    {
        HomePage: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => <Ionicons
                    name={"ios-home-outline"}
                    type={"ionicon"}
                    size={30}
                    color={tintColor}
                />
            },
            initialRouteName: 'Home',

        },
        SchedulePage: {
            screen: GFStack,
            navigationOptions: {
                tabBarLabel: 'Class Schedule',
                tabBarIcon: ({tintColor}) => <Ionicons
                    name={"ios-list-box-outline"}
                    type={"ionicon"}
                    size={30}
                    color={tintColor}
                />
            }
        },
        TrainerPage: {
            screen: PersonalFITStack,
            navigationOptions: {
                tabBarLabel: 'Training',
                tabBarIcon: ({tintColor}) =>  <Ionicons
                    name={"ios-man-outline"}
                    type={"ionicon"} size={30}
                    color={tintColor}
                />
            }
        },
        FacilityPage: {
            screen: FacilityStack,
            navigationOptions: {
                tabBarLabel: 'Facilities',
                tabBarIcon: ({tintColor}) => <Ionicons
                    name={"ios-map-outline"}
                    type={"ionicon"}
                    size={30}
                    color={tintColor}
                />
            }
        },
        ProfilePage: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => <Ionicons
                    name={"ios-person-outline"}
                    type={"ionicon"}
                    size={30}
                    color={tintColor}
                />
            }
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'white',
            style:{
                backgroundColor: '#29282A'
            },
        },
        tabStyle: {
            width: 120,
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);
export const SignedOut = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
        }
    }

});

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            SignedIn: {
                screen: TabTabNavigator,
                //initialRouteName: "Intro"

            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

export default createRootNavigator();