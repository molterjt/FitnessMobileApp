import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image,} from 'react-native';

class InstructorContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View>
                <View style={styles.rowContainer}>
                    <Image source={{uri: this.props.image}}
                           style={styles.image}
                           resizeMode="contain" />
                    <View style={styles.rowText}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.firstName + " " + this.props.lastName}
                        </Text>
                        <Text style={styles.instructor} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.email}
                        </Text>
                        <Text style={styles.description}>
                            {this.props.description}
                        </Text>
                    </View>
                </View>
                <Text style={styles.classListHeader}> Checkout my classes: </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ClassDetail', {itemId: id}) }
                        style={styles.scheduleBox}
                    >
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{this.props.classTitle} </Text>
                            <Text style={styles.time}>{this.props.classTime}</Text>
                        </View>
                        <View>
                            <Text style={styles.days}>{this.props.classDays}</Text>
                            <Text style={styles.days}>{this.props.classLocations}</Text>
                        </View>
                    </TouchableOpacity>
                <Text style={styles.classListHeader}>My Workouts: </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Workouts')}
                        style={styles.scheduleBox}
                    >
                        <View style={{flexDirection:'row'}}>
                            <Image resizeMode={"contain"} source={{uri: this.props.workoutImage}} style={{height: 30, width: 30}}/>
                            <Text style={styles.title}>{this.props.workoutTitle} </Text>
                        </View>
                    </TouchableOpacity>
            </View>

        );
    }
}

export default InstructorContainer;

const styles = StyleSheet.create({

    rowCard:{
        marginTop: 10,
        borderRadius: 4,
        shadowOffset:{  width: -1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#29282A',
        height: 250,
        padding: 10,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 4,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 3
    },
    imageRowContainer: {
        flexDirection: 'row',

        height: 200,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    instructor: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 12,
        color: '#ffffff'
    },
    days: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    description: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#ACACAC'
    },
    location: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    category: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    image: {
        flex: 4,
        height: undefined,
        width: 160
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    }
});


