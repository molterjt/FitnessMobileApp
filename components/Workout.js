import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image,} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';

class Workout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.rowCard} key={this.props.id}>
                <View style={styles.imageRowContainer}>
                    <Image source={{uri: this.props.image}}
                           style={styles.image}
                           resizeMode="contain" />
                </View>
                <View style={styles.rowContainer} key={this.props.id}>
                    <View style={styles.rowText} >
                        <Text style={styles.date} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.date}
                        </Text>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.title}
                        </Text>
                        <Text key={this.props.id} style={styles.date} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.type}
                        </Text>
                        <Text style={styles.description} numberOfLines={4} ellipsizeMode ={'tail'}>
                            {this.props.description}
                        </Text>


                        <View key={this.props.exercises.id} style={styles.exerciseCard}>
                            {this.props.exercises}
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

export default withNavigation(Workout);

const styles = StyleSheet.create({

    rowCard:{
        marginTop: 10,
        borderRadius: 4,
        shadowOffset:{  width: -1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3
    },
    exerciseCard:{
        marginTop: 10,
        padding: 2,
        borderRadius: 2,
        borderColor: 'white',
        borderWidth: 1,
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
        shadowRadius: 3,
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
    date: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ffffff'
    },
    info: {
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
    author: {
        paddingRight: 2,
        paddingBottom: 5,
        fontSize: 10,
        color: '#ACACAC',
        alignSelf: 'flex-end'
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

/*
<TouchableOpacity
                            style={{alignSelf: 'flex-end', alignItems: 'center', flexDirection: 'row', justifyContent:'center', marginRight:2}}
                            onPress={ () => {
                                this.props.navigation.navigate('Instructor', {itemId: `${this.props.authorId}`})
                            }}
                        >
                            <Text style={styles.author} numberOfLines={2} ellipsizeMode ={'tail'}>
                                {`{Author:`} {this.props.authorFirstName}}
                            </Text>
                            <MaterialCommunityIcons
                                name={"arrow-expand-all"} type={"FontAwesome"}
                                size={20} color={"#156DFA"}
                            />
                        </TouchableOpacity>
*/