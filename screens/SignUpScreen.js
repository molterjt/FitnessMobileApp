import React from 'react';
import {ScrollView, Button, Text, TextInput,
    View, StatusBar, Image, StyleSheet,
    KeyboardAvoidingView, TouchableOpacity, FlatList
} from 'react-native';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';



class SignUpScreen extends React.Component{
    render(){
        return(
            <View>
                <Text>SignUp</Text>
            </View>
        );
    }

}


export default SignUpScreen;