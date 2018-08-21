import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions,} from 'react-native';
import Workout from '../components/Workout';
import {Entypo, Ionicons} from '@expo/vector-icons'
import {withNavigation} from 'react-navigation';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }
    render(){
        return(
            <View style={{marginTop: 110, marginBottom: 60}}>

                <View style={styles.rowContainer}>

                    <View style={styles.rowText}>
                        <TouchableOpacity
                            style={{alignItems:'flex-end'}}
                            onPress={() => this.props.navigation.navigate('Edit', {itemId: this.props.id})}>
                            <Entypo
                                name={"edit"} type={"MaterialIcons"} size={20} color={'#29282A'}
                            />
                        </TouchableOpacity>

                        <Text style={styles.headText} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.username}
                        </Text>
                        <Text style={styles.supportText} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.firstName} {this.props.lastName}
                        </Text>
                        <Text style={styles.headText} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.email}
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
                                <Text style={styles.headText} numberOfLines={2}>Workouts: </Text>
                                <Text style={styles.supportText}>
                                    {this.props.workouts}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View >
                                <Text style={styles.headText} numberOfLines={2}>Classes: </Text>
                                <Text style={styles.supportText}>
                                    {this.props.classes}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View >
                                <Text style={styles.headText} numberOfLines={2}>Interests: </Text>
                                <Text style={styles.supportText}>
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
export default withNavigation(UserProfile);

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
    headText: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777'
    },
    supportText: {
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
        height: 'auto',
        width: WIDTH*.7,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    categoryThumb:{
        width: 220,
        height: 175,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
});