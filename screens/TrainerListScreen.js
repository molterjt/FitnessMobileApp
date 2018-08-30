import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import {
    StyleSheet, Button, ActivityIndicator, Modal,
    Image, Text, View, Dimensions, ImageBackground,
    StatusBar, TouchableWithoutFeedback, RefreshControl,
    ScrollView, TouchableOpacity, FlatList  } from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

import blankProfile from '../assets/images/blank-profile.png';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AllTRAINERS = gql`
    query{
        allTrainers(orderBy: firstName_ASC){
            firstName
            lastName
            imageUrl
            description
            certification
            blurb
            email
            id
        }
    }
`


class TrainerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            personalTrainingInfo: false,
        }
    }

    showPTInfoFormModal(visible){
        this.setState({personalTrainingInfo: visible})
    }

    render(){
        return(
            <View style={styles.rowColumn}>
                <ImageBackground
                    resizeMode={"contain"}
                    source={this.props.imageUrl ? {uri: this.props.imageUrl} : require("../assets/images/blank-profile.png")}
                    style={styles.profileImage}
                    alt={"Personal Trainer `${this.props.firstName}`"}
                >
                    <Text style={styles.profileName}>{this.props.firstName ? this.props.firstName : ''}</Text>
                    <Text style={styles.profileName}>{this.props.lastName ? this.props.lastName : ''}</Text>
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => {this.showPTInfoFormModal(true)}}
                    >
                        <Ionicons
                            name={"ios-information-circle-outline"}
                            size={30}
                            color={"white"}
                            style={{fontWeight: 'bold'}}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <Modal
                    transparent={true}
                    animationType={"none"}
                    visible={this.state.personalTrainingInfo}
                    onRequestClose={() => {this.showPTInfoFormModal(!this.state.personalTrainingInfo)} }
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.ModalInsideView}>
                            <TouchableOpacity
                                onPress={() => {this.showPTInfoFormModal(!this.state.personalTrainingInfo)}}
                                style={styles.closeButton}>
                                <MaterialCommunityIcons name={"close-box-outline"} size={30} color={"#156DFA"} />
                            </TouchableOpacity>

                            <View style={{flex:1, flexDirection:"row", margin:5, backgroundColor:'#931414'}}>

                                <Image
                                    source={{uri: this.props.imageUrl}}
                                    alt={"Trainer Profile Image"}
                                    resizeMode={"contain"}
                                    style={{margin: 5, borderWidth:1, borderColor:"#fff",  height:undefined, width:WIDTH*.38,

                                    }}
                                />

                                <View style={{flex:1, justifyContent: 'flex-start', margin: 10, marginTop: 20, flexWrap:'wrap'}}>
                                    <Text style={styles.trainerDetailName}>{this.props.firstName} {this.props.lastName}</Text>
                                    <Text style={styles.trainerDetailText}>{this.props.blurb}</Text>
                                    <Text style={styles.trainerDetailText}>{this.props.email}</Text>
                                    <Text style={styles.trainerDetailText}>{this.props.certifications}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, margin:5, padding: 15, backgroundColor:'#dedede', borderWidth:1, marginBottom: 20}}>
                                <Text style={{margin: 5}}>{this.props.description}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

class TrainerListView extends React.Component{
    constructor(props){
        super(props);
        this.state={refreshing: false}
    }
    _onRefresh = () => {
        this.setState({refreshing:true});
        this.props.data.refetch().then(() => {
            this.setState({refreshing: false});
        });
    };

    render(){
        const { loading, error, allTrainers } = this.props.data;
        if(loading){
            return <ActivityIndicator />
        }
        if(error){
            console.log(error);
            return <Text>Sorry, there was an error</Text>
        }
        return(
            <ScrollView style={{flex: 1, justifyContent: 'space-evenly',}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={'#156DFA'}
                    />
                }
            >
                <View style={{flex:3, borderWidth:1, flexDirection:"row", justifyContent:'space-around', flexWrap: 'wrap'}}>
                    {allTrainers.map((obj, index) => (
                        <TrainerProfile
                            key={index}
                            imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                            firstName={obj.firstName}
                            lastName={obj.lastName}
                            email={obj.email}
                            blurb={obj.blurb}
                            certifications={obj.certification}
                            description={obj.description}
                        />

                    ))}
                </View>
            </ScrollView>
        );
    }
}
const TrainingListViewWithData = graphql(AllTRAINERS)(TrainerListView);


class TrainerListScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TrainingListViewWithData/>
    }
}

export default TrainerListScreen;

const styles = StyleSheet.create({

    /***********/
    container:{
        flex: 1,
        justifyContent: 'space-around',
        margin: 2,
    },
    containerRow:{
        flexDirection: "row"
    },
    rowColumn:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: WIDTH * .32,
        height: 200,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: '#cdcdcd',
        margin:2
    },
    profileImage:{
        backgroundColor: "#000",
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        height: 200,
        width: WIDTH * .3,
        borderWidth: 1,
        borderRadius: 10,
        padding:4,
    },
    profileName:{
        color: '#fff',
        fontSize: 12,
        fontWeight: '0.5',
        alignContent: 'center'
    },
    profileEmail: {
        color: '#fff',
        fontSize: 10,
    },
    profileButton:{
        alignContent: 'end',
        marginTop: 130,
        padding:1,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    ModalInsideView:{
        alignItems: 'center',
        backgroundColor : "#fff",
        height: 500 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 3,
        borderColor: '#156DFA',
        opacity: "0.99",
        marginBottom: 30,
    },
    closeButton: {
        alignSelf: 'flex-end',
        position:'relative',
        justifyContent: "pull-right",
        top: 2,
        right: 7,
    },
    trainerDetailText: {
        color: "#fff",
        fontSize: 12,
        marginTop: 4,
    },
    trainerDetailName:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

/*

                    <View style={{backgroundColor: "red", height: HEIGHT * .22, width: WIDTH*.33 }}></View>
                    <View style={{backgroundColor: "green", height: HEIGHT * .22, width: WIDTH*.33 }}></View>
                    <View style={{backgroundColor: "blue", height: HEIGHT * .22, width: WIDTH*.33}}></View>
                    <View style={{backgroundColor: "yellow", height: HEIGHT * .22, width: WIDTH*.33 }}></View>
                    <View style={{backgroundColor: "red", height: HEIGHT * .22, width: WIDTH*.33 }}></View>
                    <View style={{backgroundColor: "green", height: HEIGHT * .22, width: WIDTH*.33 }}></View>
                    <View style={{backgroundColor: "blue", height: HEIGHT * .22, width: WIDTH*.33}}></View>
                    <View style={{backgroundColor: "yellow", height: HEIGHT * .22, width: WIDTH*.33}}></View>

<View style={styles.containerRow}>
                    <View style={styles.rowColumn}>
                        <ImageBackground
                            resizeMode={"contain"}
                            source={require("../assets/images/blank-profile.png")}
                            style={styles.profileImage}
                            alt={"Personal Trainer"}
                        >
                            <Text style={styles.profileName}>FirstName</Text>
                            <Text style={styles.profileName}>LastName</Text>
                            <TouchableOpacity
                                style={styles.profileButton}
                            >
                                <Ionicons
                                    name={"ios-information-circle-outline"}
                                    size={30}
                                    color={"white"}
                                    style={{fontWeight: 'bold'}}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.rowColumn}>
                        <ImageBackground
                            resizeMode={"contain"}
                            source={this.props.imageUrl ? this.props.imageUrl : require("../assets/images/blank-profile.png")}
                            style={styles.profileImage}
                            alt={"Personal Trainer"}
                        >
                            <Text style={styles.profileName}>{this.props.firstName ? this.props.firstName : ''}</Text>
                            <Text style={styles.profileName}>{this.props.lastName ? this.props.lastName : ''}</Text>
                            <TouchableOpacity
                                style={styles.profileButton}
                            >
                                <Ionicons
                                    name={"ios-information-circle-outline"}
                                    size={30}
                                    color={"white"}
                                    style={{fontWeight: 'bold'}}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.rowColumn}></View>
                </View>
                <View style={styles.containerRow}>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                </View>
                <View style={styles.containerRow}>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                </View>
                <View style={styles.containerRow}>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                    <View style={styles.rowColumn}></View>
                </View>






*/