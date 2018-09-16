import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {graphql, Query} from 'react-apollo';
import {
    StyleSheet, ActivityIndicator, Platform, Text, View, Modal,
    ScrollView, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback
} from 'react-native';
import GroupFitnessClass from '../components/GroupFitnessClass';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import moment from 'moment';


const SINGLE_CLASS_QUERY = gql`
    query SingleClass($id: ID!){
        GroupFitClass(id: $id){
            id
            title
            time
            startTime
            description
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email,id}
            imageUrl
            videoUrl
            category{title}
            comments(orderBy: createdAt_DESC){content, userComment{username, id}, createdAt}
        }
    }
`

/*
let queryUserId;
try{
    AsyncStorage.getItem("MyUserId").then( (dataId) => {
        queryUserId = JSON.parse(dataId);
        console.log("queryUserId === " + queryUserId);
        return queryUserId;
    }).done();
} catch (error) {
    console.log("MyUserId error" + error);
}
*/

const ClassComments = ({id}) => (

    <Query query={SINGLE_CLASS_QUERY} variables={{id: id}} pollInterval={500}>
        { ({loading, error, data }) => {
            if(loading) return <ActivityIndicator/>;
            if(error) return console.log(error);
            if(data.GroupFitClass.comments.length < 1){
                return (

                    <View style={styles.commentContainer}>
                        <Text style={styles.commentText}>Be the first to leave a comment!</Text>
                    </View>
                );
            } else {
                return (
                    <ScrollView style={{paddingBottom: 30}}>
                        <View style={{marginTop: 10, marginBottom: 20}}/>
                        {data.GroupFitClass.comments.map((obj) => (
                            <View style={styles.commentContainer}>
                                <Text style={styles.commentText}>
                                    {obj.content}
                                </Text>
                                <Text style={{fontSize: 10, fontStyle:'italic'}}>
                                    ~{'[' + obj.userComment.username + ' @ ' + moment(obj.createdAt).format("M/D/Y hh:mm a") +  ']'}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                );
            }
        }}
    </Query>
);


let queryUserId;

class SingleClassDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commentModalVisible: false,
            isLoading: true,
        };
    }
    showModal(visible){
        this.setState({commentModalVisible: visible})
    }

    componentDidMount(){
        AsyncStorage.getItem("MyUserId").then( (dataId) => {
            queryUserId = JSON.parse(dataId);
            this.setState({currentUserId: queryUserId, isLoading: false});
            console.log("queryUserId === " + queryUserId);
            return queryUserId;
        }).done();

    }
    render() {
        if (this.state.isLoading) {
            return <View><Text>Loading...</Text></View>;
        }
        console.log('queryUserId:  ' + queryUserId);
        const { data: { loading, error, GroupFitClass } } = this.props;
        if(loading){
            return  <ActivityIndicator size="large" color='#931414' style={{marginTop: 20}} />
        }
        if(error) {
            return (
                <View>
                    <Text>Error</Text>
                    {console.log(error)}
                </View>
            )
        }
        return (
            <ScrollView style={{  flex:1, backgroundColor: '#fff'}}>
                <GroupFitnessClass
                    key={this.props.data.GroupFitClass.id}
                    title={this.props.data.GroupFitClass.title}
                    time = {this.props.data.GroupFitClass.time}
                    days={this.props.data.GroupFitClass.days.map(({name}) => name).join(' | ')}
                    instructor={this.props.data.GroupFitClass.instructor.firstName}
                    description = {this.props.data.GroupFitClass.description}
                    location={this.props.data.GroupFitClass.location.buildingName + ' | ' + GroupFitClass.location.facilityName}
                    image={this.props.data.GroupFitClass.imageUrl}
                    category={this.props.data.GroupFitClass.category.map(({title}) => title).join(', ')}
                    userCommentId={ queryUserId}
                    classCommentId={this.props.navigation.state.params.itemId}
                    userComment={this.props.userComment}
                    video={this.props.videoUrl}
                    classStart={this.props.data.GroupFitClass.startTime}
                    userCheckinId={queryUserId}
                    classCheckinId={this.props.data.GroupFitClass.id}

                />
                <View style={{flexDirection: "row", justifyContent:"center", alignSelf: "center",
                    padding: 5, backgroundColor: "transparent", height: 68, width: "80%", marginTop: 15}}>
                    <TouchableOpacity
                        style={{ marginRight: 50 }}
                        onPress={ () => {
                            console.log( `${GroupFitClass.instructor.id}`);
                            this.props.navigation.navigate('Instructor', {itemId: `${GroupFitClass.instructor.id}`})
                        }}
                    >
                        <MaterialCommunityIcons
                            name={"arrow-expand-all"} type={"FontAwesome"}
                            size={30} color={"#156DFA"}
                            style={styles.thumb}
                        />
                        <Text style={styles.buttonText}>More with {GroupFitClass.instructor.firstName}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.showModal(true)}} >
                        <MaterialCommunityIcons
                            name={"comment-text-outline"}
                            size={30} color={"#156DFA"}
                            style={styles.thumb}
                        />
                        <Text style={styles.buttonText}>Class Comments</Text>
                    </TouchableOpacity>
                </View>
                    <Modal
                        transparent={true}
                        animationType={"none"}
                        visible={this.state.commentModalVisible}
                        onRequestClose={() => {this.showModal(!this.state.commentModalVisible)} }
                    >
                        <TouchableOpacity
                            onPress={() => this.showModal(!this.state.commentModalVisible)}
                            style={{ marginTop: 20, alignItems:'center', height: '85%'}}
                        >
                            <ScrollView style={styles.ModalInsideView} >
                                <TouchableWithoutFeedback  >
                                        <View  >
                                            <TouchableOpacity
                                                onPress={() => {this.showModal(!this.state.commentModalVisible)}}
                                                style={styles.closeButton}
                                            >
                                                <MaterialCommunityIcons name={"close-box-outline"} size={30} color={"#156DFA"}/>
                                            </TouchableOpacity>
                                            <Text style={{fontStyle: "italic", fontWeight: "bold", color: "#156DFA"}}>Comments & Feedback:</Text>
                                            <ClassComments id ={this.props.navigation.state.params.itemId} />
                                        </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>

                        </TouchableOpacity>

                    </Modal>

            </ScrollView>
        );
    }
}
SingleClassDetailScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object,
        GroupFitClass: PropTypes.object,
    }).isRequired
};

const WithGFClassInformation = graphql(SINGLE_CLASS_QUERY, {
    options: ({navigation}) => {
        return {
            variables: {id: navigation.state.params.itemId},
        }
    }
})(SingleClassDetailScreen);

class GFClassView extends Component{
    render(){
        return(
            <WithGFClassInformation navigation = {this.props.navigation} />
        );
    }
}

export default GFClassView;

const styles = StyleSheet.create({
    closeButton: {
        alignSelf: 'flex-end',
        position:'relative',
        top: 2,
        right: 1,
    },
    formButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgba(155, 10, 2, 0.5)',
        padding: 5,
        marginTop: 25,
        marginBottom: 40,
        width: '33%',
        height: 30,
    },
    buttonText: {
        fontSize: 10,
        color: "#156DFA",
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    thumb:{
        marginTop: 4,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    commentText:{
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: "#fff"
    },
    commentContainer: {
        marginTop: 10,
        padding:8,
        borderColor: '#000000',
        borderBottomWidth: 0.75,
    },
    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    ModalInsideView:{
        marginTop: 30,
        marginBottom: 20,
        paddingBottom:10,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor : "#fff",
        height: 600 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 3,
        borderColor: '#156DFA',
        opacity: "0.955",
    },
});