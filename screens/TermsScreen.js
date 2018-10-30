import React from 'react'
import {ActivityIndicator, View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, WebView} from 'react-native';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Logout from '../components/Logout';
import gql from "graphql-tag";
import {graphql, Query, compose, Mutation} from "react-apollo";

const WIDTH=Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const GET_URL = gql`
    query{
        User(id: "cjl83s8e80tr701140bq9hxcc"){
            phone
        }
    }
`

class TermsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        const {User, loading, error} = this.props.data;
        console.log(this.props.data);
        console.log(User);
        if(loading){
            return(
                <ActivityIndicator/>
            )
        }
        return(
            <WebView source={{uri: User.phone}} />
        );
    }
}

export default graphql(GET_URL)(TermsScreen);