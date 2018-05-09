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
            <View style={{justifyContent:'center', borderBottomWidth:1}}>
                <View style={{marginTop: 18, marginLeft: 10}}>
                    <Text style={{color:"#000", fontWeight:"bold", fontSize: 15}}>{this.props.title}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{color:"#535353", fontStyle:"italic"}}>Member Rate: </Text>
                        <Text style={{color:"#000"}}>{this.props.memberRate}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{color:"#535353", fontStyle:"italic"}}>Unit Cost: </Text>
                        <Text style={{color:"#000"}}>{this.props.memberRateUnitPrice}</Text>
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
                    <View style={{width: WIDTH*.5, height: HEIGHT*.5,backgroundColor: '#ffffff', borderWidth: 1,
                    borderRadius: 10,}}>
                        <TrainingMembership
                            title={"20 Session Package"}
                            memberRate={"$550"}
                            memberRateUnitPrice={"$27.5/session"}
                            registerUrl={"74"}
                        />
                        <TrainingMembership
                            title={"10 Session Package"}
                            memberRate={"$310"}
                            memberRateUnitPrice={"$31/session"}
                            registerUrl={"73"}
                        />
                        <TrainingMembership
                            title={"5 Session Package"}
                            memberRate={"$180"}
                            memberRateUnitPrice={"$36/session"}
                            registerUrl={"70"}
                        />
                        <TrainingMembership
                            title={"3 Session Package"}
                            memberRate={"$120"}
                            memberRateUnitPrice={"$40/session"}
                            registerUrl={"72"}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>

                    <ScrollView

                        style={{flex:1 ,width: WIDTH*.5, height: HEIGHT*.5,backgroundColor: '#ffffff', borderWidth: 1,
                            borderRadius: 10, marginBottom: 60}}
                    >
                        <TrainingMembership
                            title={"Monthly Subscription Level 1"}
                            memberRate={"$140/month"}
                            registerUrl={"122"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription Level 2"}
                            memberRate={"$250/month"}
                            registerUrl={"123"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription Level 3"}
                            memberRate={"$300/month"}
                            registerUrl={"124"}
                        />

                    </ScrollView>
                    <View style={{width: WIDTH*.5, height: HEIGHT*.5,backgroundColor: '#cdcdcd'}}>
                        <Image
                            resizeMode={"cover"}
                            source={require("../assets/images/girl-dumbbell-step-ups-800x400.png")}
                            style={{width: WIDTH*.5, height: HEIGHT*.25}}
                        />
                        <Text>Explore Trainers</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: WIDTH, height: HEIGHT*(1/4), backgroundColor: '#535353'}}>

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


