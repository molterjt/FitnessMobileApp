import React from 'react';
import { Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {HeaderComponent} from "./HeaderComponent";
import NavigationBar from './NavigationBar';
import moment from 'moment';


const DELETE_INSTRUCTOR = gql`
    mutation deleteIntrsuctor($id: ID!){
        deleteIntrsuctor(id: $id){
            id
        }
    }
`

const INSTRUCTOR_LIST=gql`
    query{
        allInstructors(orderBy: lastName_DESC){
            id
            firstName
            lastName
            email
            classes{title, category{title}}
            instructorId
            alsoTrainer{workouts{title}}
            imageUrl
            isTrainer
            createdAt
            description
            _classesMeta{count}
        }
    }
`

const RemoveInstructor = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_INSTRUCTOR}
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
                            console.log("Instructor with: " + id + " was deleted");
                        }

                    }}
                >Delete</button>
            )}
        </Mutation>
    );
}




class InstructorList extends React.Component{
    render(){
        return(
            <Query query={INSTRUCTOR_LIST}>
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
                                    <tbody style={{textAlign: 'center', fontSize:12}}>
                                    <tr >
                                        <th className={"th"} >Image:</th>
                                        <th className={"th"}>Name:</th>
                                        <th className={"th"}>Email:</th>
                                        <th className={"th"}>Description:</th>
                                        <th className={"th"}>Created_At:</th>
                                        <th className={"th"}>Class Count:</th>
                                        <th className={"th"}>ClassList:</th>
                                        <th className={"th"}>Trainer?</th>
                                        <th className={"th"}>TrainerWorkouts:</th>
                                    </tr>
                                    {data.allInstructors.map(({id, firstName, lastName, email, description, createdAt,
                                                                  classes, instructorId, alsoTrainer, imageUrl, isTrainer, _classesMeta}) => (
                                            <tr key={id}>
                                                <td style={{ border:'2px solid black',  width: 200, }}><img style={{height: 100, width: 120}} src={imageUrl} alt={instructorId} /></td>
                                                <td style={{ border:'2px solid black', minWidth: 50, }}>{firstName} {lastName}</td>

                                                <td style={{ border:'1px solid black',  width: 100, padding: 3  }}>{email}</td>
                                                <td style={{ border:'1px solid black',  minWidth: 300,}}>{description}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{moment(createdAt).format('MM/D/YYYY') + `\n` + moment(createdAt).format(('h:m:ss a'))}</td>
                                                <td style={{ border:'1px solid black',  width: 30, }}>{_classesMeta.count}</td>
                                                <td style={{ border:'1px solid black',  width: 200, }}>
                                                    <tr style={{fontSize:11, fontStyle:"italic", backgroundColor: "#cdcdcd"}}>
                                                        <th style={{textAlign: 'center'}}>ClassName:</th>
                                                        <th style={{textAlign: 'center'}}>ClassType:</th>
                                                    </tr>
                                                    {classes.map(({title, category}) => (
                                                        <tr>
                                                            <td style={{ border:'1px solid black',  width: 1000, fontSize:11, padding: 5 }}>{title}</td>
                                                            <td style={{ border:'1px solid black',  width: 1000, fontSize:11, padding: 5 }}>{category.map(({title}) => title).join(', ')}</td>
                                                        </tr>

                                                    ))}
                                                </td>
                                                <td style={{ border:'1px solid black',  maxWidth: 30, }}>{isTrainer.toString()}</td>
                                                <td style={{ border:'1px solid black',  width: 200, }}>
                                                    {alsoTrainer.map(({workouts}) => (
                                                        <td style={{width: 200, }}>{workouts.map(({title}) => title).join(';  ')}</td>
                                                    ))}
                                                </td>

                                                <td style={{ border:'1px solid black',  width: 70, }}><RemoveInstructor id={id}/></td>
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

export default InstructorList;

