import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal, WebView} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';


class Event extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventRegisterModal: false
        }

    }
    showEventRegisterModal(visible){
        this.setState({eventRegisterModal: visible})
    }

    render(){
        return(
            <View style={styles.rowCard} key={this.props.id}>
                <View style={styles.imageRowContainer}>
                    <Image source={{uri: this.props.image}}
                           style={styles.image}
                           resizeMode="contain" />
                </View>
                <View style={styles.rowContainer} key={this.props.id}>
                    <View style={styles.rowText} >
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.date} numberOfLines={2} ellipsizeMode ={'tail'}>
                                {this.props.date}
                            </Text>
                            <Text style={styles.date} numberOfLines={1} ellipsizeMode ={'tail'}>
                                {this.props.days}
                            </Text>
                            <Text style={styles.date} numberOfLines={1} ellipsizeMode ={'tail'}>
                                {this.props.time}
                            </Text>
                            </View>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.name}
                        </Text>
                        <Text key={this.props.id} style={styles.info} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.fees}
                        </Text>
                        <Text style={styles.description} numberOfLines={4} ellipsizeMode ={'tail'}>
                            {this.props.description}
                        </Text>
                        <Text style={styles.info} numberOfLines={4} ellipsizeMode ={'tail'}>
                            {this.props.location}
                        </Text>
                        <TouchableOpacity onPress={() => {this.showEventRegisterModal(true)}}
                                          style={{marginTop: 25, flexDirection: "row",
                                              justifyContent: 'center', alignItems: 'center',
                                              backgroundColor: "#931414", width: "50%", alignSelf: "center"

                                          }}>
                            <Text style={{color: "#fff", fontSize: 12}}>Register</Text>
                            <MaterialCommunityIcons
                                name={"checkbox-marked-circle-outline"}
                                size={25}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.eventRegisterModal}
                    onRequestClose={() => {this.showEventRegisterModal(!this.state.eventRegisterModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showEventRegisterModal(!this.state.eventRegisterModal)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>

                    <WebView
                        source={{uri:"http://recmiamioh.maxgalaxy.net/Registration.aspx?ActivityID=" + this.props.registerUrl}}
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </Modal>


            </View>
        );
    }
}

export default Event;

const styles = StyleSheet.create({

    rowCard:{
        marginTop: 10,
        borderRadius: 4,
        shadowOffset:{  width: -1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3
    },
    exerciseCard:{
        marginTop: 10,
        padding: 2,
        borderRadius: 2,
        borderColor: 'white',
        borderWidth: 1,


    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#29282A',
        height: 'auto',
        padding: 10,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 4,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 3,
    },
    imageRowContainer: {
        flexDirection: 'row',

        height: 200,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    date: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ffffff',
        fontStyle: "italic"
    },
    info: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    description: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#ACACAC'
    },
    location: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    author: {
        paddingRight: 30,
        marginTop: 2,
        fontSize: 10,
        color: '#ACACAC',
        alignSelf: 'flex-end'
    },
    image: {
        flex: 4,
        height: undefined,
        width: 160
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    }
});