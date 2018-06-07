import React from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {HeaderComponent} from "./HeaderComponent";
import NavigationBar from './NavigationBar';



const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id:$id){
            id
        }
    }
`


const USER_LIST = gql`
    query{
        allUsers(orderBy:createdAt_DESC){
            email
            id
            username
            createdAt
            _commentsMeta{count}
        }
    }
`

const RemoveUser = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_USER}
        >
            {(deleteUser, {data}) => (
                <button
                    onClick={ e => {
                        if(window.confirm("Are you sure you want to DELETE?")){
                            deleteUser({
                                variables: {
                                    id
                                }
                            });
                            console.log("User with: " + id + " was deleted");
                        }

                    }}
                >Delete</button>
            )}
        </Mutation>
    );
}

class UserLIst extends React.Component{
    render(){
        return(
            <Query query={USER_LIST}>
                {({loading, error, data}) => {
                    if(loading) return "Loading...";
                    if(error) return `Errro! ${error.message}`;
                    return(
                        <div>
                            <HeaderComponent/>
                            <NavigationBar/>
                            <div >
                                <table style={{margin: 10, padding: 20, border:'1px solid black',}}>
                                    <tbody>
                                    <tr >

                                        <th>User:</th>
                                        <th>Email:</th>
                                        <th>Created_At:</th>
                                        <th>CommentCount:</th>
                                    </tr>
                                    {data.allUsers.map(({id, email, username, createdAt, _commentsMeta }) => (
                                            <tr key={id}>

                                                <td style={{ border:'1px solid black',  width: 200, }}>{username}</td>
                                                <td style={{ border:'1px solid black',  width: 250, }}>{email}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}>{createdAt.toString().substring(0, 10)} {createdAt.substring(11,19)}</td>
                                                <td style={{ border:'1px solid black',  width: 150, }}>{_commentsMeta.count}</td>
                                                <td style={{ border:'1px solid black',  width: 100, }}><RemoveUser id={id}/></td>
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


export default UserLIst;