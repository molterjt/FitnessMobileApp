import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, Text, View, ActivityIndicator,
    TouchableOpacity, FlatList, RefreshControl,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql, compose}  from 'react-apollo';
import ScheduleItem from '../components/ScheduleItem';
import {Entypo} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

const ALL_DAYS_SCHEDULE_QUERY = gql`
    query{
        Mondays: allGroupFitClasses(
            filter:{
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
            isPublished
        }
        Tuesdays: allGroupFitClasses(
            filter:{
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
            isPublished
        }
        Wednesdays: allGroupFitClasses(
            filter:{
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
            isPublished
        }
        Thursdays: allGroupFitClasses(
            filter:{
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
            isPublished
        }
        Fridays: allGroupFitClasses(
            filter:{
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
        Saturdays: allGroupFitClasses(
            filter:{
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
        Sundays: allGroupFitClasses(
            filter:{
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

class AllGFClassView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loading: true,
            refreshing: false,
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 800);

        this.setState({
            items: [
                { title: 'Monday', data: this.props.Mondays },
                { title: 'Tuesday', data: this.props.Tuesdays },
                { title: 'Wednesday',data: this.props.Wednesdays },
                { title: 'Thursday', data: this.props.Thursdays },
                { title: 'Friday', data: this.props.Fridays },
                { title: 'Saturday', data: this.props.Saturdays },
                { title: 'Sunday', data: this.props.Sundays },
            ],
            position: 0,
        })
    }

    _onRefresh = () => {
        this.setState({refreshing:true});
        this.props.data.refetch().then(() => {
            this.setState({refreshing: false});
        });
    };

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
                    />
                </TouchableOpacity>
            </View>

        )
    };

    /*
       const { mondays} = this.props.MondayScheduleQuery;
       const { tuesdays} = this.props.TuesdayScheduleQuery;
       const { wednesdays } = this.props.WednesdayScheduleQuery;
       const {thursdays } = this.props.ThursdayScheduleQuery;
       const {fridays} = this.props.FridayScheduleQuery;
       const {saturdays} = this.props.SaturdayScheduleQuery;
       const {sundays} = this.props.SundayScheduleQuery;
       const {items} = this.state;
       */

    _keyExtractor = (item) => item.id;

    render() {
        //this.props.data.refetch({});
        const {loading, error} = this.props;
        const {Mondays, Tuesdays, Wednesdays, Thursdays, Fridays, Saturdays, Sundays} = this.props.data;


        if(loading || this.state.loading === true){
            return  <ActivityIndicator size="large" color="#931414" style={{marginTop: 20}} />
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
                dot={<View style={{backgroundColor: '#a5b1b2', width: 10, height: 10, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
                activeDot={<View style={{backgroundColor: '#931414', width: 12, height: 12, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Mondays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }

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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Tuesdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Wednesdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Thursdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Fridays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Saturdays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
                    <TouchableOpacity
                        style={{marginBottom: 0, marginTop: 0, borderRadius: 8, padding:3, alignItems:'center',}}
                        onPress={() => this.props.navigation.navigate('GroupFitPrograms')}>
                        <MaterialCommunityIcons
                            name={"checkbox-marked-circle-outline"}
                            size={30}
                            color={'#931414'}
                        />
                        <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={Sundays}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor={'#931414'}
                            />
                        }
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
    Mondays: PropTypes.array,
    Tuesdays: PropTypes.array,
    Wednesdays: PropTypes.array,
    Thursdays: PropTypes.array,
    Fridays: PropTypes.array,
    Saturdays: PropTypes.array,
    Sundays: PropTypes.array,

};


/*
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

*/

const FullClassSCheduleWithData = graphql(ALL_DAYS_SCHEDULE_QUERY)(AllGFClassView);

/*
const AllGFClassViewWithData = compose(
    graphql(TUESDAY_QUERY, {name: 'TuesdayScheduleQuery'}),
    graphql(WEDNESDAY_QUERY, {name: 'WednesdayScheduleQuery'}),
    graphql(THURSDAY_QUERY, {name: 'ThursdayScheduleQuery'}),
    graphql(FRIDAY_QUERY, {name: 'FridayScheduleQuery'}),
    graphql(SATURDAY_QUERY, {name: 'SaturdayScheduleQuery'}),
    graphql(SUNDAY_QUERY, {name: 'SundayScheduleQuery'}),
    graphql(MONDAY_QUERY, {name: 'MondayScheduleQuery'}),

)(AllGFClassView);
*/

class ScheduleScreen extends React.Component{
    /*static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerRight: (
                <TouchableOpacity
                    style={{marginBottom: 2, marginTop: 15, marginRight: 15, borderRadius: 8, padding:3, alignItems:'center',}}
                    onPress={() => navigation.navigate('GroupFitPrograms')}>
                    <MaterialCommunityIcons
                        name={"checkbox-marked-circle-outline"}
                        size={30}
                        color={'#931414'}
                    />
                    <Text style={{color: "#000", fontSize: 10, fontWeight:'bold', marginTop:-5, alignSelf: 'center'}}>Register</Text>
                </TouchableOpacity>
            ),

        };
    };
*/
    constructor(props){
        super(props);
    };
    render(){

        return(
            //<AllGFClassViewWithData navigation = {this.props.navigation} />
            <FullClassSCheduleWithData navigation = {this.props.navigation} />
        );
    }
}

export default ScheduleScreen;

const styles = StyleSheet.create({
    dayScheduleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#931414'
    },
    wrapper:{
        marginBottom: 20,
        paddingBottom:20,
        backgroundColor: 'transparent',
    },
    daySlide:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        //borderColor: '#931414',
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

