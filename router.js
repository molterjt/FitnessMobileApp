import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom, SwitchNavigator, } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import FacilitiesScreen from './screens/FacilitiesScreen';
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
import TrainerListScreen from './screens/TrainerListScreen';
import GroupFitProgramsScreen from './screens/GroupFitProgramsScreen';
import SettingsScreen from "./screens/SettingsScreen";
import TermsScreen from "./screens/TermsScreen";
import SubmitWorkoutScreen from './screens/SubmitWorkoutScreen';

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
                title: 'MiamiOH Rec Fit',

                headerStyle:{

                    backgroundColor: "#fff"
                }
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions:{
                title: 'Settings',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
        },
        Profile: {
            screen: ProfileScreen,
            path: '/Profile',
            navigationOptions:{
                title: 'Profile',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
        Edit: {
            screen: EditScreen,
            path: '/profile',
            navigationOptions:{
                title: 'Edit Profile',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
        Terms: {
            screen: TermsScreen,
            navigationOptions:{
                title: 'Privacy & Terms of Use',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
        Workouts: {
            screen: WorkoutScreen,
            path: '/workouts',
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
        SubmitWorkout:{
            screen: SubmitWorkoutScreen,
            path:'/workouts/submitWorkout',
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
        },
        ExerciseDetail: {
            screen: ExerciseDetail,
            path:'/workouts/exercise',
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
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

const EventStack = StackNavigator(
    {
        Events: {
            screen: EventsScreen,
            path: '/Events',
            navigationOptions:{
                title: 'Events',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
    }
);

const ProfileStack = StackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            path: '/',
            navigationOptions:{
                title: 'Profile',
                headerStyle: {
                    height:30,
                }

            },

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
                title: 'Fitness Schedule',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            },
        },
        GroupFitPrograms:{
            screen: GroupFitProgramsScreen,
            path: '/groupFitProgramsScreen',
            navigationOptions:{
                title: 'Group Fitness Programs',
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
        },
        ClassDetail: {
            screen: SingleClassDetailScreen,
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
        },
        Instructor:{
            screen: InstructorScreen,
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }
            }
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
                headerStyle:{
                    backgroundColor: "#ebebeb"
                }
            },
        },
    }
);

const PersonalFITStack = StackNavigator(
    {
        Trainer:{
            screen: TrainerScreen,
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }

            },
        },
        TrainerList: {
            screen: TrainerListScreen,
            path: '/trainers',
            navigationOptions:{
                headerStyle:{
                    backgroundColor: "#fff"
                }

            },
        },

        Workouts: {
            screen: WorkoutScreen,
            path: '/workouts',
            navigationOptions:{
                headerStyle: {
                    backgroundColor: "#fff"
                }
            },
        },
        ExerciseDetail: {
            screen: ExerciseDetail,
            path:'/workouts/exercise',
        },
        SubmitWorkout:{
            screen: SubmitWorkoutScreen
        }
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
        EventPage: {
            screen: EventStack,
            navigationOptions: {
                tabBarLabel: 'Events',
                tabBarIcon: ({tintColor}) => <Ionicons
                    name={"ios-calendar-outline"}
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
                backgroundColor: '#29282A',
                paddingBottom: 8,
                height: 55,
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