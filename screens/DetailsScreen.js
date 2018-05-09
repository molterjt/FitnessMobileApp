import React from 'react'
import {Animated, Dimensions, ScrollView,
        Image, StyleSheet, Text,
        View, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {graphql, Query} from 'react-apollo';
import Facility from '../components/Facility';

const SCREEN_WIDTH = Dimensions.get("window").width;

const xOffset = new Animated.Value(0);

const transitionAnimation = index => {
    return{
        transform: [
            {perspective: 800},
            {
                scale: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: [0.25, 1, 0.25]
                })
            },
            {
                rotateX: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: ["45deg", "0deg", "45deg"]
                })
            },
            {
                rotateY: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: ["-45deg", "0deg", "45deg"]
                })
            }
        ]
    }
}

const Screen = props => {
    return(
        <View style={styles.scrollPage}>
            <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
                <View style={{
                    flex:1,
                    justifyContent:"center",
                    alignSelf:"center",
                    marginTop: 10,
                    backgroundColor: ""
                }}
                >
                <Image
                    source={{uri: props.image}}
                    style={styles.image}
                    resizeMode={"contain"}
                />
                </View>
                <ScrollView style={{
                    marginTop: 5,
                    marginBottom: 5,
                    flex: 1,
                    borderWidth: 2,
                    width: 320,
                    padding: 20,
                    borderRadius: 15,
                }}>
                    <Text
                        style={{
                            fontSize: 18, fontWeight:"bold",
                            color: "red", marginBottom: 5,
                    }}>
                        {props.facilityName}
                    </Text>
                    <Text style={{fontWeight:"bold",}}>{props.buildingName}</Text>
                    <Text>{props.hours}</Text>
                    <Text>{props.open}</Text>
                    <Text style={{marginBottom: 5}}>Classes:</Text>
                    <View>{props.classList}</View>
                    <Text style={{marginBottom: 5}}>
                       Events:
                    </Text>
                    <View style={{marginBottom: 10}}>{props.eventList}</View>

                </ScrollView>
            </Animated.View>
        </View>
    );
};

class DetailsScreen extends React.Component{
    render(){
        const { data: { loading, error, allFacilities } } = this.props;
        if(loading) return <ActivityIndicator />
        return(
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: {contentOffset: {x: xOffset } } }],
                    {useNativeDriver: true}
                )}
                horizontal
                pagingEnabled
                style={styles.scrollView}
            >

                {allFacilities.map( (obj,index) => (
                    <Screen
                        index={index}
                        image={obj.imageUrl}
                        facilityName={obj.facilityName}
                        hours={obj.hours}
                        open={obj.open}
                        buildingName={obj.buildingName}
                        classList={obj.classes.map(({title, time, days}) => (
                            <View style={{
                                marginBottom: 10,
                                backgroundColor: "#ebebeb",
                                width: "100%",
                                borderWidth: 0.5,
                                borderRadius: 8,
                                padding: 4,
                            }}>
                                <Text style={{fontWeight:"bold"}}>{title}</Text>
                                <Text style={{fontSize: 12}}>{time}</Text>
                                <Text style={{fontFamily: "italic", fontSize: 10,}}>{days.map(({name}) => name).join(', ')}</Text>
                            </View>
                        ))}
                        eventList={obj.events.map(({name, date, time}) => (
                            <View style={{
                                marginBottom: 10,
                                backgroundColor: "#ebebeb",
                                width: "100%",
                                borderWidth: 0.5,
                                borderRadius: 8,
                                padding: 4,
                            }}>
                            <Text style={{fontWeight:"bold"}}>{name}</Text>
                            <Text style={{fontSize: 12}}>{date}</Text>
                            <Text style={{fontFamily: "italic", fontSize: 10,}}>{time}</Text>
                            </View>
                        ))}
                    />
                ))}

            </Animated.ScrollView>
        );
    }
}
DetailsScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object,
        allFacilities: PropTypes.array,
    })
}


const FACILITY_QUERY = gql`
    query{
        allFacilities{
            facilityName
            buildingName
            classes(orderBy: sortTime_ASC){title, days{name}, time, sortTime}
            id
            open
            hours
            events(orderBy: date_ASC){name, date, time}
            imageUrl
        }
    }
`


export default graphql(FACILITY_QUERY)(DetailsScreen);

const styles = StyleSheet.create({
    scrollPage: {
        width: SCREEN_WIDTH,
        padding: 20,
    },
    scrollView: {
        flexDirection: "row",
        backgroundColor: "white",
    },
    screen: {
        height: 600,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white"
    },
    image: {
        flex: 1,
        height: "auto",
        width: 320,
        borderRadius: 15,
        borderWidth: 2,
    },
});