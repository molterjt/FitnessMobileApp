import React from 'react';
import { Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {HeaderComponent} from "./HeaderComponent";
import NavigationBar from './NavigationBar';


const DELETE_TRAINER = gql`
    mutation deleteTrainer($id: ID!){
        deleteTrainer(id: $id){
            id
        }
    }
`

const TRAINER_LIST=gql`
    query{
        allTrainers{
            id
            firstName
            lastName
            email
            alsoInstructor{classes{title}}
            description
            imageUrl
            createdAt
            workouts{title}
            _workoutsMeta{count}
        }
    }
`

const RemoveTrainer = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_TRAINER}
        >
            {(deleteInstructor, {data}) => (
                <button
                    onClick={ e => {
                        if(window.confirm("Are you sure you want to DELETE?")){
                            deleteInstructor({
                                variables: {
                                    id
                                }
                            });
                            console.log("Trainer with id: " + id + " was deleted");
                        }
                    }}
                >Delete</button>
            )}
        </Mutation>
    );
}

class TrainerList extends React.Component{
    render(){
        return(
            <Query query={TRAINER_LIST}>
                {({loading, error, data}) => {
                    if(loading) return "Loading...";
                    if(error) return `Errro! ${error.message}`;
                    return(
                        <div style={{alignItems:"center", justifyContent:"center"}}>
                            <HeaderComponent/>
                            <NavigationBar/>
                            <h1>Instructor:</h1>
                            <div >
                                <table style={{margin: 10, padding: 20, border:'1px solid black', alignContent:"center", justifyContent: "center"}}>
                                    <title>Instructor</title>
                                    <tbody>
                                    <tr >
                                        <th>Image:</th>
                                        <th>FirstName:</th>
                                        <th>LastName:</th>
                                        <th>Email:</th>
                                        <th>Description:</th>
                                        <th>Created_At:</th>
                                        <th> Workout_Count:</th>
                                        <th>ClassList:</th>
                                        <th>TrainerWorkouts:</th>

                                    </tr>
                                    {data.allTrainers.map(({id, firstName, lastName, email, description, createdAt,
                                                                 workouts, alsoInstructor , imageUrl, _workoutsMeta}) => (
                                            <tr key={id}>
                                                <td style={{ border:'2px solid black',  width: 100, }}><img style={{height: 100, width: 100}} src={imageUrl} alt={firstName} /></td>
                                                <td style={{ border:'2px solid black', width: 70, }}>{firstName}</td>
                                                <td style={{ border:'1px solid black',  width: 80, }}>{lastName}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{email}</td>
                                                <td style={{ border:'1px solid black',  width: 300, }}>{description}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{createdAt.toString().substring(0, 10)} {createdAt.substring(11,19)}</td>
                                                <td style={{ border:'1px solid black',  width: 30, }}>{_workoutsMeta.count}</td>
                                                <td style={{ border:'1px solid black',  width: 200, }}>
                                                    <tr><th>ClassName:</th></tr>
                                                    {alsoInstructor.map(({classes}) => (
                                                        <tr>
                                                            <td style={{ border:'1px solid black',  width: 1000, }}>{classes.map(({title}) => title).join("; ")}</td>
                                                        </tr>

                                                    ))}
                                                </td>
                                                <td style={{ border:'1px solid black',  width: 200, }}>
                                                    <td style={{ border:'1px solid black',  width: 200, }}>{workouts.map(({title}) => title).join("; ") + "\n"} </td>
                                                </td>

                                                <td style={{ border:'1px solid black',  width: 70, }}><RemoveTrainer id={id}/></td>
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

export default TrainerList;

