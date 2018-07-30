import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,} from 'react-native';
import Workout from '../components/Workout';
import ProfilePicData from '../data/ProfilePictures'
import CategoryData from "../data/ClassCategories";

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }
    render(){
        return(
            <View style={{marginTop: 60, marginBottom: 80}}>
                <View style={styles.rowContainer}>
                    <View style={styles.rowText}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.username}
                        </Text>
                        <Text style={styles.instructor} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.firstName} {this.props.lastName}
                        </Text>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.email} {this.props.phone}
                        </Text>
                        <Text style={styles.location} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.dateOfBirth}
                        </Text>
                    </View>
                </View>
                <View >
                    <ScrollView style={styles.rowText}>
                        <View style={styles.rowContainer} >
                            <View >
                                <Text style={styles.title} numberOfLines={2}>Workouts: </Text>
                                <Text style={styles.instructor}>
                                    {this.props.workouts}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View >
                                <Text style={styles.title} numberOfLines={2}>Classes: </Text>
                                <Text style={styles.instructor}>
                                    {this.props.classes}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View >
                                <Text style={styles.title} numberOfLines={2}>Interests: </Text>
                                <Text style={styles.instructor}>
                                    {this.props.interests}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
export default UserProfile;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 'auto',
        padding: 10,
        marginRight: 3,
        marginLeft: 3,
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
        height: 'auto',
        width: 120
    },
    rowText: {
        flex: 1,
        flexDirection: 'column',
        height: 'auto'
    },
    categoryThumb:{
        width: 220,
        height: 175,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
});