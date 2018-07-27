import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, Text, View, ActivityIndicator,
    TouchableOpacity, FlatList,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql, compose}  from 'react-apollo';
import ScheduleItem from '../components/ScheduleItem';
import {Entypo} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';



class AllGFClassView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        this.setState({
            items: [
                { title: 'Monday', data: this.props.MondayScheduleQuery },
                { title: 'Tuesday', data: this.props.TuesdayScheduleQuery },
                { title: 'Wednesday',data: this.props.WednesdayScheduleQuery },
                { title: 'Thursday', data: this.props.ThursdayScheduleQuery },
                { title: 'Friday', data: this.props.FridayScheduleQuery },
                { title: 'Saturday', data: this.props.SaturdayScheduleQuery },
                { title: 'Sunday', data: this.props.SundayScheduleQuery },
            ],
            position: 0,
        })
    }
    _renderItem = ({item}) => {
        return(
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ClassDetail', {itemId: item.id})}
                    key={this._keyExtractor}
                >
                    <ScheduleItem
                        id={item.id}
                        title={item.title}
                        time = {item.time}
                        instructor={item.instructor.firstName}
                        location={item.location.buildingName + '\n' + item.location.facilityName}
                        thumbnail={item.imageUrl}
                        cancel={item.cancelled}
                        //days={item.days.map(({name}) => name).join('|')}
                    />
                </TouchableOpacity>
            </View>

        )
    }
    _keyExtractor = (item) => item.id;

    render() {
        const {loading, error} = this.props;
        const { mondays} = this.props.MondayScheduleQuery;
        const { tuesdays} = this.props.TuesdayScheduleQuery;
        const { wednesdays } = this.props.WednesdayScheduleQuery;
        const {thursdays } = this.props.ThursdayScheduleQuery;
        const {fridays} = this.props.FridayScheduleQuery;
        const {saturdays} = this.props.SaturdayScheduleQuery;
        const {sundays} = this.props.SundayScheduleQuery;
        const {items} = this.state;

        if(loading){
            return  <ActivityIndicator size="large" color="#0000ff" />
        }
        if(error){
            console.log(error);
            return (
                <Text>Seems like we tripped up somewhere</Text>
            );
        }
        return (

            <Swiper
                style={styles.wrapper}
                index={this.state.position}
                showButtons={false}
                dot={<View style={{backgroundColor: 'gray', width: 10, height: 10, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
                activeDot={<View style={{backgroundColor: '#7dd2ff', width: 12, height: 12, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
                paginationStyle={{bottom: 15}}
            >
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Monday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={mondays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Tuesday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={tuesdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}

                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Wednesday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={wednesdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Thursday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={thursdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Friday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={fridays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Saturday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={saturdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
                <View  style={styles.daySlide}>
                    <View style={styles.dayScheduleContainer}>
                        <Entypo
                            name={"chevron-thin-left"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginRight: 35 }}
                        />
                        <Text style={styles.text}>Sunday</Text>
                        <Entypo
                            name={"chevron-thin-right"} type={"Entypo"}
                            size={25} color={'#ffffff'}
                            style={{marginTop: 6, marginLeft: 35}}
                        />
                    </View>
                    <FlatList
                        data={sundays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <View style={{margin:25}}>
                    </View>
                </View>
            </Swiper>
        );
    }
}
AllGFClassView.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    mondays: PropTypes.array,
    tuesdays: PropTypes.array,
    wednesdays: PropTypes.array,
    thursdays: PropTypes.array,
    fridays: PropTypes.array,
    saturdays: PropTypes.array,
    sundays: PropTypes.array,

};

const GET_ALL_GF_CLASSES = gql`
    query{
        allGroupFitClasses{
            id
            title
            time
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email,id}
            imageUrl
        }
    }
`

const MONDAY_QUERY = gql`
    query MondayScheduleQuery{
        mondays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Monday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
        }
    }

`
const TUESDAY_QUERY = gql`
    query TuesdayScheduleQuery{
        tuesdays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Tuesday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
        }
    }

`
const WEDNESDAY_QUERY = gql`
    query WednesdayScheduleQuery{
        wednesdays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Wednesday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
        }
    }

`
const THURSDAY_QUERY = gql`
    query ThursdayScheduleQuery{
        thursdays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Thursday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
        }
    }

`
const FRIDAY_QUERY = gql`
    query FridayScheduleQuery{
        fridays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Friday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
            isPublished
        }
    }

`
const SATURDAY_QUERY = gql`
    query SaturdayScheduleQuery{
        saturdays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Saturday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
            isPublished
        }
    }

`
const SUNDAY_QUERY = gql`
    query SundayScheduleQuery{
        sundays: allGroupFitClasses(filter:{
            days_some: {name_contains: "Sunday"},
            isPublished: true,
        }, orderBy: startTime_ASC){
            id
            title
            time
            cancelled
            location{buildingName, facilityName}
            days{name}
            instructor{firstName,lastName,email, id}
            imageUrl
            isPublished
        }
    }

`


const AllGFClassViewWithData = compose(

    graphql(TUESDAY_QUERY, {name: 'TuesdayScheduleQuery'}),
    graphql(WEDNESDAY_QUERY, {name: 'WednesdayScheduleQuery'}),
    graphql(THURSDAY_QUERY, {name: 'ThursdayScheduleQuery'}),
    graphql(FRIDAY_QUERY, {name: 'FridayScheduleQuery'}),
    graphql(SATURDAY_QUERY, {name: 'SaturdayScheduleQuery'}),
    graphql(SUNDAY_QUERY, {name: 'SundayScheduleQuery'}),
    graphql(MONDAY_QUERY, {name: 'MondayScheduleQuery'}),

)(AllGFClassView);


class ScheduleScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <TouchableOpacity
                    style={{marginBottom: 2, marginTop: 1, marginRight: 15, borderRadius: 8, padding:3, alignItems:'center',}}
                    onPress={() => navigation.navigate('GroupFitPrograms')}>
                    <MaterialCommunityIcons
                        name={"checkbox-marked-circle-outline"}
                        size={30}
                        color={'#931414'}
                    />
                    <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Programs</Text>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props){
        super(props);
    }
    render(){
        return(
            <AllGFClassViewWithData navigation = {this.props.navigation} />
        );
    }
}

export default ScheduleScreen;

const styles = StyleSheet.create({
    dayScheduleContainer: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#931414'
    },
    wrapper:{
        marginBottom: 30,
        paddingBottom:30,
        backgroundColor: 'transparent',
    },
    daySlide:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: '#931414',
        //backgroundColor: '#cdcdcd',

    },
    text:{
        color: 'white',
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 24,
        marginLeft: 40,
        marginRight: 40,
    },
    categoryThumb:{
        width: 140,
        height: 100,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 10,
    },
});


/*
{this.state.items.map((item, key) => (
                        <View key={key} style={item.css}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                                <Entypo
                                    name={"chevron-thin-left"} type={"Entypo"}
                                    size={25} color={'#ffffff'}
                                    style={{marginTop: 6, marginRight: 35 }}
                                />
                                <Text style={styles.text}>{item.title}</Text>
                                <Entypo
                                    name={"chevron-thin-right"} type={"Entypo"}
                                    size={25} color={'#ffffff'}
                                    style={{marginTop: 6, marginLeft: 35}}
                                />
                            </View>

                            <FlatList
                                data={this.props.data.allGroupFitClasses}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                            <View style={{margin:25}}>
                            </View>

                        </View>
                    ))}
*/


/*
<View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Tuesday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>

                        <FlatList
                            data={tuesdays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}

                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
                    <View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Wednesday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>
                        <FlatList
                            data={wednesdays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
                    <View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Thursday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>
                        <FlatList
                            data={thursdays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
                    <View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Friday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>
                        <FlatList
                            data={fridays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
                    <View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Saturday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>
                        <FlatList
                            data={saturdays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
                    <View  style={styles.daySlide}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#343434'}}>
                            <Entypo
                                name={"chevron-thin-left"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginRight: 35 }}
                            />
                            <Text style={styles.text}>Sunday</Text>
                            <Entypo
                                name={"chevron-thin-right"} type={"Entypo"}
                                size={25} color={'#ffffff'}
                                style={{marginTop: 6, marginLeft: 35}}
                            />
                        </View>
                        <FlatList
                            data={sundays}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        <View style={{margin:25}}>
                        </View>
                    </View>
*/