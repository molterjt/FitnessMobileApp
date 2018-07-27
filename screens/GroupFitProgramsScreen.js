import React from 'react';
import {
    View, Text, Dimensions, Modal,
    ImageBackground, TouchableOpacity, Image,
    ScrollView, WebView, StatusBar,
    StyleSheet
} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class GroupFitMembership extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showGFRegisterModal: false
        }
    }
    showGFRegisterModal(visible){
        this.setState({showGFRegisterModal: visible})
    }
    render(){
        return(
            <View style={{alignItems:'center', borderBottomWidth:1}}>
                <View style={{marginTop: 18, marginLeft: 10}}>
                    <Text style={{color:"#000", fontWeight:"bold", fontSize: 16}}>{this.props.title}</Text>

                        {
                            this.props.memberRate
                            ?
                                <View style={{flexDirection: "row", marginTop: 5, justifyContent:'center'}}>
                                    <Text style={{color:"#535353", fontStyle:"italic", fontSize: 12}}>Member Rate: </Text>
                                    <Text style={{color:"#000", fontSize: 12}}>{this.props.memberRate}</Text>
                                </View>
                            :
                                null

                        }


                </View>
                {
                    this.props.registerUrl
                        ?
                        <TouchableOpacity onPress={() => {this.showGFRegisterModal(true)}}
                                          style={{marginTop: 5, marginLeft:10, marginBottom: 4,
                                              flexDirection: "row",
                                              justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                                              backgroundColor: "#931414", width: "50%",}}>

                            <Text style={{color: "#fff", fontSize: 11}}>Register</Text>
                            <MaterialCommunityIcons
                                name={"checkbox-marked-circle-outline"}
                                size={18}
                                color={"white"}
                            />
                        </TouchableOpacity>
                        :
                        <View style={{flexDirection: "row", paddingTop: 3, paddingBottom: 5}}>
                            <Text style={{color:"#535353", fontStyle:"italic", fontSize: 12}}>** Register at Rec Pro Shop **</Text>
                        </View>
                }
                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.showGFRegisterModal}
                    onRequestClose={() => {this.showGFRegisterModal(!this.state.showGFRegisterModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showGFRegisterModal(!this.state.showGFRegisterModal)}}
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


class GroupFitProgramsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showGFPrivateClassModal: false
        }
    }
    showPrivateClassModal(visible){
        this.setState({showGFPrivateClassModal: visible})
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor: "#fff", marginTop: 0}}>
                <StatusBar/>
                <ScrollView style={{marginBottom: 20}}>
                    <GroupFitMembership
                        title={"Single Class Pass"}
                        memberRate={"$15"}
                        registerUrl={"71"}
                    />
                    <GroupFitMembership
                        title={"10 Class Pass"}
                        memberRate={"$60"}
                        registerUrl={"216"}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#29282A'}}>
                        <MaterialCommunityIcons
                            name={"dumbbell"}
                            size={30}
                            color={"white"}
                            style={{paddingLeft: 20, paddingRight: 5, paddingTop:2}}
                        />
                    <Text style={{marginTop: 5, paddingRight: 20, backgroundColor: '#29282A', color:"#fff", fontWeight:"bold", width: WIDTH, justifyContent:'center',
                        fontSize: 18, alignSelf:'center', padding: 5,}}>

                          groupFit

                    </Text>
                    </View>
                    <GroupFitMembership
                        title={"Monthly Subscription"}
                        memberRate={"$40"}

                    />
                    <GroupFitMembership
                        title={"Semester Pass"}
                        memberRate={"$130"}
                        registerUrl={"246"}
                    />
                    <GroupFitMembership
                        title={"Academic Year Pass"}
                        memberRate={"$230"}
                        registerUrl={"290"}
                    />
                    <GroupFitMembership
                        title={"12 Month Pass"}
                        memberRate={"$380"}
                        registerUrl={"81"}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#29282A'}}>
                        <MaterialCommunityIcons
                            name={"weight"}
                            size={30}
                            color={"white"}
                            style={{paddingLeft: 20, paddingRight: 5, paddingTop: 2}}
                        />
                        <Text style={{marginTop: 5, paddingRight: 20, color:"#fff", fontWeight:"bold",  justifyContent:'center',
                            fontSize: 18, alignSelf:'center', padding: 5,}}>

                            functionalFit

                        </Text>
                    </View>
                    <GroupFitMembership
                        title={"Monthly Subscription"}
                        memberRate={"$40"}

                    />
                    <GroupFitMembership
                        title={"Semester Pass"}
                        memberRate={"$150"}
                        registerUrl={"272"}
                    />
                    <GroupFitMembership
                        title={"Academic Year Pass"}
                        memberRate={"$225"}
                        registerUrl={"291"}
                    />
                    <GroupFitMembership
                        title={"12 Month Pass"}
                        memberRate={"$300"}
                        registerUrl={"188"}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#29282A'}}>
                        <MaterialCommunityIcons
                            name={"calendar-check"}
                            size={30}
                            color={"white"}
                            style={{paddingLeft: 20, paddingRight: 5, paddingTop:2}}
                        />
                        <Text style={{marginTop: 5, paddingRight: 20, backgroundColor: '#29282A', color:"#fff", fontWeight:"bold", width: WIDTH, justifyContent:'center',
                            fontSize: 18, alignSelf:'center', padding: 5,}}>
                            Private Classes
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {this.showPrivateClassModal(true)}}
                        style={styles.exploreButtons}>
                        <Text style={styles.exploreButtonText}>Request A Class</Text>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.showGFPrivateClassModal}
                    onRequestClose={() => {this.showPrivateClassModal(!this.state.showGFPrivateClassModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showPrivateClassModal(!this.state.showGFPrivateClassModal)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{uri:"https://miamioh.formstack.com/forms/on_demand_group_fitness_class_request"}}
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </Modal>

            </View>
        )
    }



}

export default GroupFitProgramsScreen;

const styles = StyleSheet.create({

    exploreButtons:{
        flexDirection:"row",
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor:"#000",
        borderRadius: 15,
        backgroundColor: "#931414",
        height: 45,
        width: WIDTH*.45,
        alignSelf: "center"
    },

    exploreButtonText:{
        color: "#fff",
        fontSize: 16
    },


});