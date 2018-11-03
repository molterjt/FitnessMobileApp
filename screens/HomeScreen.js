import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, Text, View, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, FlatList,
    AsyncStorage, Animated, Modal, WebView, Image, Linking, ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import NewsItem from '../components/NewsItem';
import {graphql,Query, withApollo} from "react-apollo";
import {withNavigation, SafeAreaView} from 'react-navigation';
import gql from "graphql-tag";
import Logout from '../components/Logout';
import {AUTH_TOKEN} from "../constants/auth";

//clientId: "3fbfc0bbcbe2479380819ec95f9a91f9"
//access_token: "access_token=903600607.3fbfc0b.7141650ef26342dd8706c5e30e476ba1"

const accessToken = "903600607.3fbfc0b.7141650ef26342dd8706c5e30e476ba1"
const instaUserId = "903600607"

const GET_NEWSITEMS = gql`
    query{
        allNewsItems(filter:{isPublished:true}, orderBy:updatedAt_DESC){
            id
            imageUrl
            title
            blurb
            instructor
            location
        }
    }
`

let queryUserId;

AsyncStorage.getItem("MyUserId").then( (dataId) => {
    queryUserId = dataId;
    console.log(JSON.stringify(dataId));
    console.log("queryUserId:" + queryUserId);
    return queryUserId;
}).done();


class NewsItemWindow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            refreshing: false
        }
    }
    _renderItem = ({item}) => (
        <NewsItem
            id={item.id}
            title={item.title}
            instructor={item.instructor}
            blurb = {item.blurb}
            location={item.location}
            thumbnail={item.imageUrl}
        />
    );
    _keyExtractor = (item, index) => item.id;

    _onRefresh = () => {
        this.setState({refreshing:true});
        this.props.data.refetch().then(() => {
            this.setState({refreshing: false});
        });
    };

    render(){
        return(
            <Query query={GET_NEWSITEMS}>
                {({loading, error, data}) => {
                    if(loading){
                        return <ActivityIndicator size={'large'} color={'#fff'} />
                    }
                    if(error){
                        console.log(error);
                        return <Text>Sorry, we have encountered an error!  Are you connected to the internet or cellular data?</Text>
                    }
                    return(
                        <FlatList
                            data={data.allNewsItems}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            horizontal={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                    tintColor={'#931414'}
                                />
                            }
                        />
                    );
                }}
            </Query>
        );
    }
}

const NewsItemWindowWithData = graphql(GET_NEWSITEMS)(NewsItemWindow);



class HomeScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 15, marginTop:7}}
                    onPress={() => navigation.navigate('Settings')}>
                    <FontAwesome
                        name={"gear"} type={"MaterialIcons"} size={30} color={'#931414'}
                    />
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity
                    style={{marginLeft: 15, marginTop:7}}
                    onPress={() => navigation.navigate('Workouts')}>
                    <MaterialIcons
                        name={"fitness-center"} type={"MaterialIcons"} size={30} color={'#931414'}

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
            showModal: false,
            currentUserId: '',
            currentUserToken: '',

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

    findYourFitModal(visible){
        this.setState({showModal: visible})
    }


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

        return (
        <View style={{flex: 1, backgroundColor: 'transparent'}}>

            <StatusBar barStyle="default"/>
            <ImageBackground
                source={require('../assets/images/Rig-FullView.jpg')}
                style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center'}}
                resizeMode='cover'
            >
                <View style={styles.overlay} />
                <View style={{alignItems: 'center', alignContent: 'center',}}>
                    <Text style={styles.whatNew}>News</Text>
                </View>
                <NewsItemWindowWithData/>
                <TouchableOpacity
                    onPress={() => {
                        this.findYourFitModal(true)
                    }}
                    style={{
                        marginTop: 20, marginBottom: 60, flexDirection: "row", justifyContent: 'center',
                        alignItems: 'center', backgroundColor: "#931414", width: "50%", alignSelf: "center",
                        borderRadius: 10,
                    }}>
                    <Text style={{color: "#fff", fontSize: 18}}>
                        FindYourFIT
                    </Text>
                    <MaterialCommunityIcons
                        name={"checkbox-marked-circle-outline"}
                        size={35}
                        color={"white"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/miamiuniversityfitness/")}
                                  style={{
                                      marginBottom: 20, flexDirection: "row",
                                      justifyContent: 'center', alignItems: 'center',
                                      alignSelf: "center"
                                  }}>
                    <FontAwesome
                        name={"instagram"}
                        size={20}
                        color={"white"}
                    />
                    <Text style={{color: "#fff", fontSize: 12}}> MiamiUniversityFitness</Text>
                </TouchableOpacity>
                <Modal
                    transparent={false}
                    animationType={"none"}
                    visible={this.state.showModal}
                    onRequestClose={() => {
                        this.findYourFitModal(!this.state.showModal)
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.findYourFitModal(!this.state.showModal)
                        }}
                        style={{marginLeft: 5, marginTop: 50, flexDirection: "row"}}>
                        <Ionicons name={"md-arrow-back"} size={30} color={"#156DFA"}/>
                        <Text style={{color: "#156DFA", marginTop: 7, marginLeft: 8}}>Go Back</Text>
                    </TouchableOpacity>
                    <View style={{alignItems:'center'}}>
                        <Image
                            source={{uri: "https://i.imgur.com/xfTySI5.jpg"}}
                            alt={'Miami Recreation Fitness design element'}
                            resizeMode={'cover'}
                            style={{width: 400, height: 380}}
                        />
                        <Text style={{fontStyle:'italic', padding: 10}}>
                            The Fitness Department strives to create an environment of inclusion for the Miami Recreation community to develop their fitness identity through a variety of opportunities to reach individual fitness goals.
                        </Text>
                    </View>
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
        shadowColor: '#000',
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
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.3
    }
});

/* const userIdentity = AsyncStorage.getItem("MyUserId").then( (dataId) => {
            console.log("dataId " + dataId);
            return (dataId);
        }).done();
        */