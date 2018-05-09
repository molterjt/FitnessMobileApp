import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text, View, StatusBar, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet} from 'react-native';
import gql from "graphql-tag";
import { graphql, compose, Mutation } from "react-apollo";

class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.state.params.userIdentity,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            interests: [],
        };
        this._updateInfo = this._updateInfo.bind(this);
    }
    _updateInfo = async () => {
        const {userId, firstName, lastName, dateOfBirth} = this.state;
        await this.props.mutate({
            variables: {
                id: userId,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth
            }
        });
        console.log(firstName);
        this.props.navigation.goBack(null);
    }

    render() {
        const {params} = this.props.navigation.state;
        //const {User, loading} = this.props.data;
        //if(this.props.data.loading) return <ActivityIndicator />;

        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)'
            }}>
                <StatusBar barStyle="default"/>

                <TextInput
                    onChangeText={(firstName) => this.setState({firstName})}
                    type={"text"}
                    placeholder={"First Name"}
                    style={styles.textInput}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                    value={this.state.firstName}
                />
                <TextInput
                    onChangeText={(lastName) => this.setState({lastName})}
                    type={"text"}
                    placeholder={"Last Name"}
                    style={styles.textInput}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                    value={this.state.lastName}
                />
                <TextInput
                    onChangeText={(dateOfBirth) => this.setState({dateOfBirth})}
                    type={"text"}
                    placeholder={"dd/mm/yyyy"}
                    style={styles.textInput}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                    value={this.state.dateOfBirth}
                />
                <View>
                    <TouchableOpacity onPress={() => this._updateInfo()} style={styles.formButton}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
/*
EditScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        updateUser: PropTypes.object,
    })
};
*/
const updateProfile = gql`
    mutation updateUser($id:ID!, $firstName: String, $lastName: String, $dateOfBirth: String){
        updateUser(id: $id, firstName: $firstName, lastName:$lastName, dateOfBirth: $dateOfBirth){
            firstName
            lastName
            phone
            dateOfBirth
        }
    }
`

export default graphql(updateProfile)(EditScreen);

const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        margin: 20,
        padding: 10,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    formButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(155, 10, 2, 0.9)',
        padding: 20,
        marginTop: 40,
        marginBottom: 40,
        width: '33%',
        height: 15,
    },
    buttonText:{
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        alignContent:'center',
        justifyContent:'center',
    },
});