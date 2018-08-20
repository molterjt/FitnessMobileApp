import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Image,
    Dimensions, Alert, Modal, TextInput, WebView
} from 'react-native';
import gql from 'graphql-tag';
import {graphql } from 'react-apollo';
import {FontAwesome, MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const CreateClassCommentByUser = gql`
    mutation createComment($content: String!, $userCommentId: ID!, $classCommentId: ID!){
        createComment(
            content: $content,
            userCommentId: $userCommentId,
            classCommentId: $classCommentId
        ){
            id
            content
            classComment{title}
            userComment{username}
        }
    }
`

class GroupFitnessClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addCommentModalVisible: false,
            videoModalVisible: false,
            userComment: "",
        };
        this._createComment = this._createComment.bind(this);
    }
    _createComment = async () => {
        const {userComment} = this.state;
        await this.props.mutate({
            variables: {
                content: this.props.userComment,
                userCommentId: this.props.userCommentId,
                classCommentId: this.props.classCommentId,
            }
        });
        console.log(userComment);
        this.setState({userComment: ""});
        return this.showCommentModal(false);
    }
    showCommentModal(visible){
        this.setState({addCommentModalVisible: visible})
    }
    showVideoModal(visible){
        this.setState({videoModalVisible: visible})
    }

    render(){
        return(
            <View style={styles.rowCard}>
                <View style={styles.imageRowContainer}>
                    <Image source={{uri: this.props.image}}
                           style={styles.image}
                           resizeMode="cover"
                    />
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowText}>
                        <View style={{flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                                {this.props.title}
                            </Text>

                            <Text style={styles.time} numberOfLines={1} ellipsizeMode ={'tail'}>
                                {this.props.time}
                            </Text>
                        </View>

                        <Text style={styles.instructor} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.instructor}
                        </Text>
                        <Text style={styles.days} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.days}
                        </Text>

                        <Text style={styles.location} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.location}
                        </Text>
                        <Text style={styles.description} numberOfLines={1} ellipsizeMode ={'tail'}>
                            Type: {this.props.category}
                        </Text>
                        <Text style={styles.description} numberOfLines={9} ellipsizeMode ={'tail'}>
                            Description: {this.props.description}
                        </Text>
                        <View style={{flexDirection: "row",justifyContent:"center", alignItems:"center", marginTop: 25, }}>
                            <TouchableOpacity
                                onPress={() => {
                                    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
                                    this.showVideoModal(true)}
                                }
                                style={{alignItems: "center", marginRight: 50}}
                            >
                                <MaterialIcons
                                    name={"ondemand-video"}
                                    size={30}
                                    color={'#fff'}
                                />
                                <Text style={{color:"#fff", alignSelf: "center", fontSize: 10, marginTop: 3}}>Class Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{alignItems: "center", marginRight: 50}}
                                onPress={ () => Alert.alert(
                                'Alert',
                                'Do you want to check-in?',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                    {text: 'Yes', onPress: () => console.log('Yes, Check-in')}
                                ],
                                { cancelable: false }
                            )}>
                                <Ionicons name={"md-checkmark-circle-outline"} size={30} color={'#fff'} />
                                <Text style={{color:"#fff", alignSelf: "center", fontSize: 10, marginTop: 3}}>Check-In</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {this.showCommentModal(true)}}
                                style={{alignItems: "center"}}>
                                <FontAwesome name={"commenting-o"} size={30} color={'#fff'}/>
                                <Text style={{color:"#fff", alignSelf: "center", fontSize: 10, marginTop: 3}}>Comment</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <Modal
                        transparent={true}
                        animationType={"fade"}
                        visible={this.state.addCommentModalVisible}
                        onRequestClose={() => {this.showCommentModal(!this.state.addCommentModalVisible)} }
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.ModalInsideView}>
                                <TouchableOpacity
                                    onPress={() => {this.showCommentModal(!this.state.addCommentModalVisible)}}
                                    style={styles.closeButton}
                                >
                                    <MaterialCommunityIcons name={"close-box-outline"} size={30} color={"#156DFA"}/>
                                </TouchableOpacity>
                                <Text style={{fontStyle: "italic", fontWeight: "bold"}}>Have a comment?</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={9}
                                    onChangeText={ (userComment) => this.setState({userComment})}
                                    value={this.props.userComment = this.state.userComment}
                                    blurOnSubmit={true}
                                    type={"text"}
                                    placeholder={'Enter Your Comments'}
                                    style={styles.textInput}
                                    underlineColorAndroid={'transparent'}
                                    autoCorrect={true}
                                />

                                <TouchableOpacity
                                    onPress={ () => this._createComment()}
                                    style={styles.formButton}
                                >
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={false}
                        animationType={"fade"}
                        visible={this.state.videoModalVisible}
                        onRequestClose={() => {this.showVideoModal(!this.state.videoModalVisible)} }
                    >
                        <TouchableOpacity
                            onPress={() => {
                                Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
                                this.showVideoModal(!this.state.videoModalVisible)
                            }}
                            style={{marginTop: 50}}
                        >
                            <MaterialCommunityIcons name={"close-box-outline"} size={30} color={"#156DFA"} title={"Go Back"}/>
                        </TouchableOpacity>

                            <WebView
                                source={{html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />' +
                                    '<iframe src="https://www.youtube.com/embed/XnUwPv5aYkw?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="75%"></iframe></html>'}}
                                style={{flex: 1}}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                    </Modal>
                </View>
            </View>
        );
    }
}
/*

*/
export default graphql(CreateClassCommentByUser)(GroupFitnessClass);

const styles = StyleSheet.create({
    commentBubble:{
        alignSelf: 'flex-end',
        justifyContent: "pull-right",
        position: "absolute",
        right: 1,
        top: 10,

    },
    commentBubbleText:{
        fontSize:10,
        fontFamily: "italic",
        color:"#fff",
        alignSelf: 'flex-end',
        justifyContent: "pull-right",
        position: "absolute",
        right: -3,
        top: -2
    },
    closeButton: {
        alignSelf: 'flex-end',
        position:'relative',
        justifyContent: "pull-right",
        top: 2,
        right: 7,
    },
    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    ModalInsideView:{
        alignItems: 'center',
        backgroundColor : "#fff",
        height: 400 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 3,
        borderColor: '#931414',
        opacity: "0.96",
        padding: 5,
    },
    VideoModalInsideView:{
        alignItems: 'center',
        //backgroundColor : "#fff",
        height: 600 ,
        width: '95%',
        borderRadius:10,
        //borderWidth: 2,
        borderColor: 'red',
        opacity: "0.96",
        padding: 5,
    },
    textInput: {
        alignSelf: 'stretch',
        height: 200,
        margin: 12,
        padding: 5,
        borderBottomColor: '#000000',
        borderWidth: 1,
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
        borderWidth: 2,
        borderColor: "#000000"
    },
    buttonText:{
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        alignContent:'center',
        justifyContent:'center',
    },
    rowCard:{
        backgroundColor: 'transparent',
        marginTop: 5,
        borderRadius: 4,
        shadowOffset:{  width: -1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3
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
        shadowRadius: 3
    },
    imageRowContainer: {
        flexDirection: 'row',
        height: HEIGHT*.28,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#931414'
    },
    time: {
        paddingRight: 5,
        marginTop: 8,
        fontSize: 14,
        color: '#ACACAC',
        position: 'absolute',
        right: 0,
    },
    instructor: {
        paddingLeft: 10,
        marginTop: 8,
        fontSize: 15,
        //fontWeight: 'bold',
        color: '#ffffff'
    },
    days: {
        paddingLeft: 10,
        marginTop: 8,
        fontSize: 14,
        color: '#ACACAC'
    },

    description: {
        paddingLeft: 10,
        marginTop: 8,
        fontSize: 12,
        fontStyle: "italic",
        color: '#ACACAC'
    },
    location: {
        paddingLeft: 10,
        marginTop: 8,
        fontSize: 14,
        color: '#ACACAC'
    },
    category: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#ACACAC'
    },
    image: {
       flex: 1,
        height: undefined,
        width: WIDTH*.93,
        backgroundColor: 'transparent',
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    },
    checkinButton: {
        backgroundColor: '#ffffff', width: '33%', height: 22, alignSelf: 'center',
        marginTop: 15, padding: 5, justifyContent: 'center', alignContent:'center',
        borderColor: "#000000", borderWidth: 1
    },
});


/*
    <View style={styles.checkinButton}>
        <Button
            title={'Check-In'}
            color={"#000000"}
            onPress={ () => Alert.alert(
                'Alert',
                'Do you want to check-in?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'Yes', onPress: () => console.log('Yes, Check-in')}
                ],
                { cancelable: false }
            )}
        />
    </View>
*/