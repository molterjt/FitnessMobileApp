import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, Text, View, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, FlatList,
    AsyncStorage, Animated, Modal, WebView, Image, Linking
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import NewsItem from '../components/NewsItem';
import Logout from '../components/Logout';
import {graphql, withApollo} from "react-apollo";
import {withNavigation} from 'react-navigation';
import gql from "graphql-tag";
import {AUTH_TOKEN} from "../constants/auth";

//clientId: "3fbfc0bbcbe2479380819ec95f9a91f9"
//access_token: "access_token=903600607.3fbfc0b.7141650ef26342dd8706c5e30e476ba1"

const accessToken = "903600607.3fbfc0b.7141650ef26342dd8706c5e30e476ba1"
const instaUserId = "903600607"


let queryUserId;

AsyncStorage.getItem("MyUserId").then( (dataId) => {
    queryUserId = dataId;
    console.log(JSON.stringify(dataId));
    console.log("queryUserId:" + queryUserId);
    return queryUserId;
}).done();


class HomeScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() => navigation.navigate('Events')}>
                    <MaterialIcons
                        name={"event-note"} type={"MaterialIcons"} size={30} color={'#29282A'}
                    />
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity
                    style={{marginLeft: 15}}
                    onPress={() => navigation.navigate('Workouts')}>
                    <MaterialIcons
                        name={"fitness-center"} type={"MaterialIcons"} size={30} color={'#29282A'}
                    />
                </TouchableOpacity>
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: null,
            comments: [],
            springVal: new Animated.Value(0),
            groupFitRegisterModal: false,
            personalFitRegisterModal: false,
            currentUserId: '',
            currentUserToken: '',
            news: [

                {
                    id: 2,
                    title: 'SilverSneakers FootLoose',
                    instructor: 'Scott Evans',
                    blurb: 'Learn his world famous sa-shae',
                    location: 'Clawson Fitness Center Studio',
                    thumbnail: 'http://somajj.com/assets/pictures/yjj.jpg'
                },
                {
                    id: 3,
                    title: 'Rough Riders Spinning',
                    instructor: 'Theodore Roosevelt',
                    blurb: 'Hill sprint charges up San Juan Hill',
                    location: 'Where ever he damn well pleases',
                    thumbnail: 'https://pictures.abebooks.com/WESTSIDER/md/md22409832253.jpg'
                },
                {
                    id: 4,
                    title: 'Brazilian Jiu-Jitsu',
                    instructor: 'Professor Matt Strack',
                    blurb: 'Learn the most effective martial art out there; have fun strangling fools',
                    location: 'Chestnut Field House: Combatives Room',
                    thumbnail: 'http://somajj.com/assets/pictures/logosmall.jpg'
                },

            ]
        }
    }

    /*
    async fetchFeed() {
        let response = await fetch(
            'https://api.instagram.com/v1/users/Bht0gbzBrz1' +
            instaUserId +
            '/media/recent/?access_token=' +
            accessToken
        );
        let posts = await response.json();

        this.setState({
            data: posts.data,
            loaded: true
        })
    }

    createPost(postInfo, index){
        let imageUri = postInfo.images.standard_resolution.url;
        let username = postInfo.user.username;
        let numlikes = postInfo.likes.count;

        return (
            <View style={{marginLeft: 50}}>
                <Image
                    source={{uri: imageUri}}
                    style={{width: 200, height: 250,}}
                />
                <View style={{backgroundColor: "#fff"}}>
                    <Text>{username}</Text>
                    <Text>{numlikes}</Text>
                </View>
            </View>
        )
    }

    */

    showGFRegisterModal(visible){
        this.setState({groupFitRegisterModal: visible})
    }
    showPersonalFitRegisterModal(visible){
        this.setState({personalFitRegisterModal: visible})
    }

    _renderItem = ({item}) => (
        <NewsItem
            id={item.id}
            title={item.title}
            instructor={item.instructor}
            blurb = {item.blurb}
            location={item.location}
            thumbnail={item.thumbnail}
        />
    );
    _keyExtractor = (item, index) => item.id;

    /*
    componentDidMount(){


        //this.fetchFeed();

        try{
            AsyncStorage.getItem(AUTH_TOKEN).then((value) => {
                console.log('AuthToken: ' + value);
                this.setState({currentUserToken: value});
            }).done();

        } catch (error){
            console.log("No Authtoken Found: " + error);
        }
        try{
            AsyncStorage.getItem("MyUserId").then( (dataId) => {
                console.log('UserAuthId: ' +  dataId);
                this.setState({currentUserId: dataId});
            }).done();

        } catch (error){
            console.log("Error: " + error)
        }

    }
    */
    render(){
        const {currentUserId, currentUserToken} = this.state;

        return(
            <View style={{flex:1, backgroundColor: 'transparent'}}>

                <StatusBar barStyle = "default"/>
                <ImageBackground
                    source={require('../assets/images/red.jpeg')}
                    style={{flex:1, backgroundColor: 'transparent',
                        justifyContent: 'center'}}
                    resizeMode='cover'
                >
                <View style={{alignItems: 'center',alignContent:'center',}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Details')}
                    >
                        <Text style={styles.whatNew}>Check what's new</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                        data={this.state.news}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => this.createPost(item, index)}
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity onPress={() => {this.showGFRegisterModal(true)}}
                                  style={{marginBottom: 60, flexDirection: "row",
                                        justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: "#931414", width: "50%", alignSelf: "center"

                                  }}>
                    <Text style={{color: "#fff", fontSize: 18}}>FindYourFIT</Text>
                    <MaterialCommunityIcons
                        name={"checkbox-marked-circle-outline"}
                        size={35}
                        color={"white"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/miamiuniversityfitness/")}
                                  style={{marginBottom: 20, flexDirection: "row",
                                      justifyContent: 'center', alignItems: 'center',
                                      alignSelf: "center"}}>
                    <FontAwesome
                        name={"instagram"}
                        size={20}
                        color={"white"}
                    />
                    <Text style={{color:"#fff", fontSize: 10}}> MiamiUniversityFitness</Text>
                </TouchableOpacity>
                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.groupFitRegisterModal}
                    onRequestClose={() => {this.showGFRegisterModal(!this.state.groupFitRegisterModal)} }
                >
                    <TouchableOpacity
                        onPress={() => {this.showGFRegisterModal(!this.state.groupFitRegisterModal)}}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>

                    <WebView
                        source={{uri:"http://recmiamioh.maxgalaxy.net/BrowsePackages.aspx?GUID=2e949c93-40fd-4a6e-8beb-3b7d933ee75e"}}
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </Modal>
                </ImageBackground>
            </View>

        );
    }
}
HomeScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        User: PropTypes.object,
    }),
};

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    whatNew:{
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        marginRight: 5,
        shadowOffset:{  width: 1.0,  height: 1.5,  },
        shadowColor: 'blue',
        shadowOpacity: 1.0,
        shadowRadius: 8
    },
    logo: {
        flex: 1,
        resizeMode: 'cover',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title: {
        color: 'white'
    }
});

/* const userIdentity = AsyncStorage.getItem("MyUserId").then( (dataId) => {
            console.log("dataId " + dataId);
            return (dataId);
        }).done();
        */