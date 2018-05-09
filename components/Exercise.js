import React from 'react'
import {View,Text,Image, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';


class ExerciseCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.rowCard}>
                <View style={styles.imageRowContainer}>
                    <Image source={{uri: this.props.image}}
                           style={styles.image}
                           resizeMode="contain" />
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowText}>

                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.name}
                        </Text>

                        <Text style={styles.details} numberOfLines={1} ellipsizeMode ={'tail'}>
                            SETS: {this.props.sets}
                        </Text>
                        <Text style={styles.details} numberOfLines={1} ellipsizeMode ={'tail'}>
                            REPS: {this.props.reps}
                        </Text>
                        <Text style={styles.details} numberOfLines={1} ellipsizeMode ={'tail'}>
                            INTENSITY: {this.props.intensity}
                        </Text>
                        <Text style={styles.details} numberOfLines={1} ellipsizeMode ={'tail'}>
                            REST-INTERVALS: {this.props.restIntervals}
                        </Text>
                        <Text style={styles.details} numberOfLines={2} ellipsizeMode ={'tail'}>
                            TEMPO: {this.props.tempo}
                        </Text>
                        <Text style={styles.description} numberOfLines={4} ellipsizeMode ={'tail'}>
                            {this.props.description}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default(ExerciseCard);

const styles = StyleSheet.create({

    rowCard:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        padding: 2,
        borderRadius: 4,
        shadowOffset:{  width: -1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3,
        backgroundColor: 'black'
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#29282A',
        height: 'auto',
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

    details: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    description: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC',
        fontStyle: 'italic',
    },
    image: {
        flex: 4,
        height: undefined,
        width: 'auto'
    },
    rowText: {
        flex: 2,
        flexDirection: 'column'
    }
});

