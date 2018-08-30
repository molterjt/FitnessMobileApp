import React from 'react';
import {Text, View, StatusBar, ScrollView, ActivityIndicator,RefreshControl } from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Event from "../components/Event";

const GET_EVENTS = gql`    
    query{
        allEvents(orderBy: publishDate_ASC, filter:{isPublished:true}){
            id
            name
            imageUrl
            registerUrl
            location{facilityName, buildingName}
            fees
            time
            description
            date
            days{name}
        }
    }
`


class EventList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            refreshing: false
        };
    }
    _onRefresh = () => {
        this.setState({refreshing:true});
        this.props.data.refetch().then(() => {
            this.setState({refreshing: false});
        });
    };
    render(){
        const {error, loading, allEvents} = this.props.data;
        if (loading) return <ActivityIndicator />;
        if(error) console.log(error);
        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={'#156DFA'}
                    />
                }
            >
                {allEvents.map(( obj, id ) => (
                        <Event
                            key={id}
                            id={obj.id}
                            name={obj.name}
                            date={obj.date}
                            fees={obj.fees}
                            time={obj.time}
                            days={obj.days.map(({name}) => name).join(', ')}
                            description={obj.description}
                            location={obj.location.facilityName + ' - ' + obj.location.buildingName}
                            image={obj.imageUrl}
                            registerUrl={obj.registerUrl}
                        />
                    )
                )}
            </ScrollView>
        );
    }
}

const EventListWithData = graphql(GET_EVENTS)(EventList);

/*
const EventsList = graphql(GET_EVENTS)(({ data }) => {

    this.state={
        refreshing: false
    };

    _onRefresh = () => {
        this.setState({refreshing:true});
        data.refetch().then(() => {
            this.setState({refreshing: false});
        });

    }

    const {loading, allEvents} = data;
    if (loading) return <ActivityIndicator />;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }
        >
            {allEvents.map(( obj, id ) => (
                    <Event
                        key={id}
                        id={obj.id}
                        name={obj.name}
                        date={obj.date}
                        fees={obj.fees}
                        time={obj.time}
                        days={obj.days.map(({name}) => name).join(', ')}
                        description={obj.description}
                        location={obj.location.facilityName + ' - ' + obj.location.buildingName}
                        image={obj.imageUrl}
                        registerUrl={obj.registerUrl}
                    />
                )
            )}
        </ScrollView>
    );
});

*/

class EventsScreen extends React.Component {
    render() {
        return (
            <View >
                <StatusBar barStyle = "default"/>
                <EventListWithData/>
            </View>
        );
    }
}

export default EventsScreen;