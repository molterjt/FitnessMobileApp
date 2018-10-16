import React from 'react'
import {Platform, View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, WebView} from 'react-native';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Logout from '../components/Logout';

const WIDTH=Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class TermsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(


                    <WebView
                        source={{uri: 'http://www.j14development.com/terms.html'}}
                    />



        );
    }
}

export default TermsScreen;