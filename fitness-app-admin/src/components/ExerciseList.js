import React from 'react';
import { Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {HeaderComponent} from "./HeaderComponent";
import NavigationBar from './NavigationBar';


const DELETE_EXERCISE = gql`
    mutation deleteExercise($id: ID!){
        deleteExercise(id: $id){
            id
        }
    }
`

const EXERCISE_LIST = gql`
    query{
        allExercises{
            name
            sets
            reps
            createdAt
            id
            description
        }
    }
`

const RemoveExercise = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_EXERCISE}
        >
            {(deleteExercise, {data}) => (
                <button
                    onClick={ e => {
                        if(window.confirm("Are you sure you want to DELETE?")){
                            deleteExercise({
                                variables: {
                                    id
                                }
                            });
                            console.log("Exercise with: " + id + " was deleted");
                        }

                    }}
                >Delete</button>
            )}
        </Mutation>
    );
}

class ExerciseList extends React.Component{
    render(){
        return(
            <Query query={EXERCISE_LIST}>
                {({loading, error, data}) => {
                    if(loading) return "Loading...";
                    if(error) return `Errro! ${error.message}`;
                    return(
                        <div style={{alignItems:"center", justifyContent:"center"}}>
                            <HeaderComponent/>
                            <NavigationBar/>
                            <div >
                                <table style={{margin: 10, padding: 20, border:'1px solid black', alignContent:"center", justifyContent: "center"}}>
                                    <title>Exercises</title>
                                    <tbody>
                                    <tr >
                                        <th>Exercise:</th>
                                        <th>sets:</th>
                                        <th>reps:</th>
                                        <th>description:</th>
                                        <th>Created_At:</th>
                                    </tr>
                                    {data.allExercises.map(({name, sets, id, reps, description, createdAt}) => (
                                            <tr key={id}>
                                                <td style={{ border:'2px solid black', width: 200, }}>{name}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{sets}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{reps}</td>
                                                <td style={{ border:'1px solid black',  width: 500, }}>{description}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{createdAt.toString().substring(0, 10)} {createdAt.substring(11,19)}</td>
                                                <td style={{ border:'1px solid black',  width: '100', }}><RemoveExercise id={id}/></td>
                                            </tr>
                                        )
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ExerciseList;

