import React from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import NavigationBar from './NavigationBar';
import {HeaderComponent} from "./HeaderComponent";

const DELETE_WORKOUT = gql`
    mutation deleteWorkout($id: ID!){
        deleteWorkout(id:$id){
            id
        }
    }
`

const ALL_WORKOUTS_Q = gql`
    query allWorkouts{
        allWorkouts{
            id
            title
            exercises{id, name, sets, reps}
            imageUrl
            createdAt
            author{firstName}
        }
    }
`

const RemoveWorkout = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_WORKOUT}
        >
            {(deleteWorkout, {data}) => (
                <button
                    onClick={ e => {
                        if(window.confirm("Are you sure you want to DELETE?")){
                            deleteWorkout({
                                variables: {
                                    id
                                }
                            });
                            console.log("Workout with id: " + id + " was deleted");
                        }

                    }}
                >Delete</button>
            )}
        </Mutation>
    );
}

class WorkoutList extends React.Component {
    render() {
        return(
            <Query query={ALL_WORKOUTS_Q}>
                {({loading, error, data}) => {
                    if(loading) return "Loading...";
                    if(error) return `Errro! ${error.message}`;
                    return(
                        <div>
                            <HeaderComponent/>
                            <NavigationBar/>

                            <div style={{justifyContent:"center", alignItems:"center"}}>
                                <table style={{margin: 10, padding: 20, border:'1px solid black', justifyContent:"center"}}>
                                    <tbody>
                                    <tr >
                                        <th>Image:</th>
                                        <th>Title:</th>
                                        <th></th>
                                        <th>Author:</th>
                                        <th>Created_At:</th>
                                    </tr>
                                    {data.allWorkouts.map(({title, createdAt, imageUrl, id, exercises, author}) => (
                                            <tr key={id} style={{justifyContent:"center"}}>
                                                <td style={{ border:'2px solid black',  width: 200, }}><img style={{height: 100, width: 160}} src={imageUrl} alt={title} /></td>
                                                <td style={{ border:'1px solid black',  width: '100', }}>{title}</td>

                                                <td style={{ border:'2px solid black',  width: 400, }}>
                                                    <tr><th>Name</th><th>Sets</th><th>Reps</th></tr>
                                                    {exercises.map(({id, name, sets, reps}) => (
                                                        <tr key={id}>
                                                            <td style={{ border:'1px solid black',  width: 200, justifyContent:"center", alignSelf:"center" }}>{name}</td>
                                                            <td style={{ border:'1px solid black',  width: 100,justifyContent:"center" }}>{sets}</td>
                                                            <td style={{ border:'1px solid black',  width: 100, justifyContent:"center"}}>{reps}</td>
                                                        </tr>
                                                    ))}
                                                </td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{author.firstName}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{createdAt.toString().substring(0, 10)} {createdAt.substring(11,19)}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}><RemoveWorkout id={id}/></td>
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

export default WorkoutList