import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, Dimensions, Modal, TouchableOpacity, Image, ScrollView, WebView} from 'react-native';
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class TrainingMembership extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPTRegisterModal: false
        }
    }
    showPTRegisterModal(visible){
        this.setState({showPTRegisterModal: visible})
    }
    render(){
        return(
            <View style={{alignItems:'center', borderBottomWidth:1}}>
                <View style={{marginTop: 18, marginLeft: 10}}>
                    <Text style={{color:"#000", fontWeight:"bold", fontSize: 13}}>{this.props.title}</Text>
                    <View style={{flexDirection: "row", marginTop: 3}}>
                        <Text style={{color:"#535353", fontStyle:"italic", fontSize: 12}}>Member Rate: </Text>
                        <Text style={{color:"#000", fontSize: 12}}>{this.props.memberRate}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginTop: 3}}>
                        <Text style={{color:"#535353", fontStyle:"italic", fontSize: 12}}>{this.props.memberRateUnitPrice}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {this.showPTRegisterModal(true)}}
                                  style={{marginTop: 5, marginLeft:10, marginBottom: 4,
                                      flexDirection: "row",
                                      justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                                      backgroundColor: "#931414", width: "50%",

                                  }}>
                    <Text style={{color: "#fff", fontSize: 11}}>Register</Text>
                    <MaterialCommunityIcons
                        name={"checkbox-marked-circle-outline"}
                        size={18}
                        color={"white"}
                    />
                </TouchableOpacity>
                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.showPTRegisterModal}
                    onRequestClose={() => {this.showPTRegisterModal(!this.state.showPTRegisterModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showPTRegisterModal(!this.state.showPTRegisterModal)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>

                    <WebView
                        source={{uri:"http://recmiamioh.maxgalaxy.net/Membership.aspx?PackageID=" + this.props.registerUrl}}
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </Modal>
            </View>
        );
    }
}





class TrainerScreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            personalTrainingInfo: false,
        }
    }
    showPTInfoFormModal(visible){
        this.setState({personalTrainingInfo: visible})
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor: "#000", marginTop: 30}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: WIDTH*.5, height: HEIGHT*.4, backgroundColor: '#000000'}}>
                        <Image
                            resizeMode={"cover"}
                            source={require("../assets/images/barbell-squad-800x400.png")}
                            style={{width: WIDTH*.5, height: HEIGHT*.4}}
                        />
                        <TouchableOpacity onPress={() => {this.showPTInfoFormModal(true)}}
                                          style={{flexDirection: "row", marginTop: 15,
                                              justifyContent: 'center', alignItems: 'center', borderWidth: 2,
                                              borderColor:"#fff", borderRadius: 15,
                                              backgroundColor: "#931414", width: WIDTH*.5, alignSelf: "center"

                                          }}>
                            <Text style={{color: "#fff", fontSize: 14}}>Request Info</Text>
                            <MaterialCommunityIcons
                                name={"checkbox-marked-circle-outline"}
                                size={35}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{width: WIDTH*.5, height: HEIGHT*.5,backgroundColor: '#ffffff', borderWidth: 1,
                    borderRadius: 10,}}>
                        <TrainingMembership
                            title={"20 Session Package"}
                            memberRate={"$550"}
                            memberRateUnitPrice={"Unit Cost: $27.5/session"}
                            registerUrl={"74"}
                        />
                        <TrainingMembership
                            title={"10 Session Package"}
                            memberRate={"$310"}
                            memberRateUnitPrice={"Unit Cost: $31/session"}
                            registerUrl={"73"}
                        />
                        <TrainingMembership
                            title={"5 Session Package"}
                            memberRate={"$180"}
                            memberRateUnitPrice={"Unit Cost: $36/session"}
                            registerUrl={"70"}
                        />
                        <TrainingMembership
                            title={"3 Session Package"}
                            memberRate={"$120"}
                            memberRateUnitPrice={"Unit Cost: $40/session"}
                            registerUrl={"72"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription 3"}
                            memberRate={"$300/month"}
                            registerUrl={"124"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription 2"}
                            memberRate={"$250/month"}
                            registerUrl={"123"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription 1"}
                            memberRate={"$140/month"}
                            registerUrl={"122"}
                        />
                    </ScrollView>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={{flex:1, width: WIDTH*.5, height: HEIGHT*.5,
                            backgroundColor: '#ffffff', borderWidth: 1,
                            borderRadius: 10, marginBottom: 60, alignItems: "center"}}
                    >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Workouts')}
                            style={{marginTop: 8, width: WIDTH*.45, alignItems:"center",
                                backgroundColor: '#000',}}
                        >
                            <Text style={{ color: "#fff"}}>Find a Workout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: WIDTH*.5, height: HEIGHT*.5,backgroundColor: '#cdcdcd',
                                alignItems:"pull-left",
                    }}>
                        <TouchableOpacity>
                            <Text>Explore Trainers</Text>
                        </TouchableOpacity>
                        <Image
                            resizeMode={"cover"}
                            source={require("../assets/images/DSC_0466.jpg")}
                            style={{width: WIDTH*.5, height: HEIGHT*.3 ,}}
                        />

                    </View>
                </View>

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.personalTrainingInfo}
                    onRequestClose={() => {this.showPTInfoFormModal(!this.state.personalTrainingInfo)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showPTInfoFormModal(!this.state.personalTrainingInfo)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{uri:"https://miamioh.qualtrics.com/jfe/form/SV_6ROkLdBRztSlYGN"}}
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </Modal>

            </View>
        );
    }
}


export default TrainerScreen;


