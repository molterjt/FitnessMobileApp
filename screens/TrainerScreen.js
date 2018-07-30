import React from 'react'
import {
    View, Text, Dimensions, Modal, ImageBackground, TouchableOpacity, Image, ScrollView, WebView, StatusBar,
    StyleSheet
} from 'react-native';
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
            <View style={{alignItems:'center', justifyContent:'center',borderBottomWidth:1}}>
                <View style={{marginTop: 18, marginLeft: 10, alignItems:'center'}}>
                    <Text style={{color:"#000", fontWeight:"bold", fontSize: 13}}>{this.props.title}</Text>
                    <View style={{flexDirection: "row", marginTop: 5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:"#535353", fontStyle:"italic", fontSize: 12}}>Member Rate: </Text>
                        <Text style={{color:"#000", fontSize: 12}}>{this.props.memberRate}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginTop: 3}}>
                        <Text style={{color:"#535353", fontStyle:"italic", fontSize: 10}}>{this.props.memberRateUnitPrice}</Text>
                    </View>

                </View>
                {
                    this.props.registerUrl
                        ?
                        <TouchableOpacity onPress={() => {this.showPTRegisterModal(true)}}
                                          style={{marginTop: 5, marginLeft:10, marginBottom: 4,
                                              flexDirection: "row",
                                              justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                                              backgroundColor: "#931414", width: "50%",}}>

                            <Text style={{color: "#fff", fontSize: 11}}>Register</Text>
                            <MaterialCommunityIcons
                                name={"checkbox-marked-circle-outline"}
                                size={18}
                                color={"white"}
                                alt={"Register checkbox-marked symbol"}
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
                    visible={this.state.showPTRegisterModal}
                    onRequestClose={() => {this.showPTRegisterModal(!this.state.showPTRegisterModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showPTRegisterModal(!this.state.showPTRegisterModal)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"} alt={"Arrow symbol to go back previous page"}/>
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
        this.state = {
            personalTrainingInfo: false,
        }
    }
    showPTInfoFormModal(visible){
        this.setState({personalTrainingInfo: visible})
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor: "#fff", marginTop: 0}}>
                <StatusBar/>
                    <View style={{alignItems: 'center',width: WIDTH, height:HEIGHT*.25,  backgroundColor: '#000', borderWidth:1, borderRadius:10}}>
                        <Image
                            resizeMode={"cover"}
                            source={require("../assets/images/barbell-squad-800x400.png")}
                            style={{width: WIDTH*.9, height: HEIGHT*.25, borderWidth:1, borderRadius:10,}}
                            alt={"Personal Training Squat Instruction"}
                        />
                    </View>
                <View style={{flex: 2, display:'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap:'wrap',alignItems:'center'}}>

                <ScrollView style={{ width: WIDTH*.5, height:HEIGHT*.6, backgroundColor: '#ffffff'}}>
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#29282A', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{marginTop: 5, backgroundColor: '#29282A', color:"#fff", fontWeight:"bold", justifyContent:'center',
                            fontSize: 12, alignSelf:'center', padding: 5,}}>
                            Programs
                        </Text>
                    </View>
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
                            memberRateUnitPrice={"3 Sessions/week in month"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription 2"}
                            memberRate={"$250/month"}
                            memberRateUnitPrice={"2 Sessions/week in month"}
                        />
                        <TrainingMembership
                            title={"Monthly Subscription 1"}
                            memberRate={"$140/month"}
                            memberRateUnitPrice={"1 Session/week in month"}
                        />

                    </ScrollView>
                    <ImageBackground
                        source={require('../assets/images/silver-background.jpg')}
                        alt={"background image of abstract silver blended with black"}
                        style={{width: WIDTH*.5, height: HEIGHT*.6, borderWidth:1, borderRadius:10,
                            backgroundColor:"#000" , alignItems: "center", justifyContent:'center',
                        }}
                    >
                        <Image source={require('../assets/images/barbell.png')} alt={'barbell graphic'}
                            style={{width: WIDTH*.45, height: 50}}
                        />

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('TrainerList')}
                            style={styles.exploreButtons}
                        >
                            <Text style={styles.exploreButtonText}>Explore Trainers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {this.showPTInfoFormModal(true)}}
                            style={styles.exploreButtons}>
                            <Text style={styles.exploreButtonText}>Request Info</Text>
                            <MaterialCommunityIcons
                                name={"checkbox-marked-circle-outline"}
                                size={35}
                                color={"white"}
                                alt={"Request Info checkbox-marked symbol"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Workouts')}
                            style={styles.exploreButtons}
                        >
                            <Text style={styles.exploreButtonText}>Find a Workout</Text>
                        </TouchableOpacity>

                        <Image source={require('../assets/images/barbell.png')} alt={'barbell graphic'}
                               style={{width: WIDTH*.45, height: 50, marginTop: 30}}
                        />
                    </ImageBackground>
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
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"} alt={'arrow symbol to go back to previous'}/>
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