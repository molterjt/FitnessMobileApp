import React from 'react'
import {Platform, View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Logout from '../components/Logout';

const WIDTH=Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class SettingsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showHelpModal: false,

        };
    }
    helpModalToggle(visible){
        this.setState({showHelpModal: visible})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.boxOutter}>
                    <Text style={styles.headText}>Profile</Text>
                    <View style={styles.boxInner}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Profile')}
                        >
                            <Ionicons name={"md-person"} type={"Ionicons"} size={95}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxOutter}>
                    <Text style={styles.headText}>Help</Text>
                    <View style={styles.boxInner}>
                        <TouchableOpacity
                            onPress={() => {
                                this.helpModalToggle(true)
                            }}
                        >
                            <Entypo name={"help-with-circle"} type={"Entypo"} size={84}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxOutter}>
                    <Text style={styles.headText}>Logout</Text>
                    <View style={styles.boxInner}>
                        <Logout>
                            <Entypo name={"log-out"} type={"Entypo"} size={72}/>
                        </Logout>

                    </View>
                </View>
                <Modal
                    transparent={false}
                    animationType={"none"}
                    visible={this.state.showHelpModal}
                    onRequestClose={() => {
                        this.helpModalToggle(!this.state.showHelpModal)
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.helpModalToggle(false)
                        }}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row", backgroundColor: 'transparent'}}
                    >
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>
                    <ScrollView style={{marginTop: 5, alignItems:'center', justifyContent: 'center', textAlign:'center', alignContent:"center"}}>
                        <Text style={{marginTop: 45, fontWeight:'bold', fontSize: 18, textAlign: 'center'}}>Help</Text>
                        <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 30, padding: 10}}>
                            <Text>If you forgot your password... </Text>
                            <Text>For Assistance email [ JeffreyMolter@gmail.com ]</Text>
                        </View>
                        <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 30, padding: 10}}>
                            <Text>If you have any problems with the application... </Text>
                            <Text>For Assistance email [ JeffreyMolter@gmail.com ]</Text>
                        </View>
                        <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 30, padding: 10}}>
                            <Text>If you would like to get involved in any Fitness programs... </Text>
                            <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 10, padding: 10}}>
                                <Text style={{fontWeight:'bold'}}>Personal Training</Text>
                                <Text>[ molterjt@MiamiOH.edu ]</Text>
                                <Text>(513) 529-8175</Text>
                            </View>
                            <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 10, padding: 10}}>
                                <Text style={{fontWeight:'bold'}}>Group Fitness</Text>
                                <Text>[ speeds@MiamiOH.edu ]</Text>
                                <Text>(513) 529-2193</Text>
                            </View>
                            <View style={{alignItems:'center', justifyContent: 'center', textAlign:'center', marginTop: 10, padding: 10}}>
                                <Text style={{fontWeight:'bold'}}>Functional Fitness</Text>
                                <Text>[ cropensw@MiamiOH.edu ]</Text>
                                <Text>(513) 529-6007</Text>
                            </View>

                        </View>
                    </ScrollView>

                </Modal>

            </View>
        );
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#931414',
    },
    boxOutter:{
        backgroundColor: '#931414',
        justifyContent:'space-between',
        alignItems:'center',
        margin: 6,
        width: WIDTH*.33,
        height: WIDTH*.33,
        borderColor:'#000',
        borderWidth: 1,
        borderRadius: 30
    },
    boxInner:{
        backgroundColor: '#fff',
        justifyContent:'space-between',
        alignItems:'center',
        margin: 2,
        width: WIDTH*.3,
        height: WIDTH*.24,
        borderColor:'#000',
        borderWidth: 1,
        borderRadius: 30
    },
    headText:{
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    }
});