import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {withNavigation} from 'react-navigation';
import Workout from '../components/Workout';

const GET_WORKOUTS = gql`
    query{
        allWorkouts{
            id
            workoutId
            title
            type{title}
            date
            description
            exercises{name, sets, reps, intensity, tempo, id, exerciseId}
            author{alsoInstructor{id, firstName}}
            imageUrl
        }
    }
`

class WorkoutView extends React.Component{

    constructor() {
        super();
        this.handlePressExercise = this.handlePressExercise.bind(this);
    }

    handlePressExercise = (exercise) => {
        console.log("exercise button press");
        this.props.navigation.navigate("ExerciseDetail", {itemId: exercise});
    };

    render() {
        const { loading, allWorkouts } = this.props.data;
        const {navigation} = this.props;
        if(this.props.data.loading){
            return <ActivityIndicator />
        }
        return(
            <ScrollView>
                {allWorkouts.map(( obj, id ) => (
                        <Workout
                            key={id}
                            id={obj.id}
                            title={obj.title}

                            type={obj.type.map(({title, id}) => title).join(', ')}
                            exercises={obj.exercises.map(({name, reps, sets, intensity, id, exerciseId, tempo}) => (
                                    <View key={id}>
                                        <TouchableOpacity
                                            onPress={() => this.handlePressExercise(id, name)}
                                            key={id}
                                            style={{flexDirection:'row'}}
                                        >
                                            {console.log({id})}
                                            <Text style={styles.title} key={exerciseId}>
                                                {name}
                                            </Text>
                                            <Ionicons
                                                name={'ios-arrow-dropright-outline'}
                                                color={'#931414'}
                                                size={15}
                                                style={{marginLeft: 3, marginTop:5}}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.info} >
                                            Sets: {sets}
                                        </Text>
                                        <Text style={styles.info} >
                                            Reps: {reps}
                                        </Text>
                                        <Text style={styles.info} >
                                            Intensity: {intensity}
                                        </Text>
                                    </View>
                                )
                            )}
                            description={obj.description}
                            authorFirstName={obj.author.alsoInstructor.map(({firstName}) => firstName)}
                            authorId={obj.author.alsoInstructor.map(({id}) => id)}
                            image={obj.imageUrl}
                        />
                    )

                )}

            </ScrollView>
        );
    }
}
WorkoutView.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        allWorkouts: PropTypes.array
    })
};

const AllWorkoutsViewWithData = graphql(GET_WORKOUTS)(WorkoutView);

class WorkoutScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <AllWorkoutsViewWithData navigation = {this.props.navigation} />
            </View>
        );
    }
}

export default withNavigation(WorkoutScreen);

const styles = StyleSheet.create({

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
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red'
    },
    info: {
        paddingLeft: 40,
        paddingTop: 3,
        fontSize: 14,
        color: '#ACACAC'
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    }
});