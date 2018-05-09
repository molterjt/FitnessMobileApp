import React from 'react';
import {
    Button, Text, View , StatusBar, FlatList, TouchableOpacity,
    ScrollView, Animated, Dimensions, Image, StyleSheet
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Facility from '../components/Facility';
import FacilityData from "../data/FacilityData";
import MapView from "react-native-maps";


const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 25;

const Images = [
    { uri: FacilityData[0].image },
    { uri: FacilityData[1].image},
    { uri: FacilityData[2].image },
    { uri: FacilityData[3].image }
]

class FacilitiesScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: FacilityData,
            markers: [
                {

                    coordinate: {
                        latitude: 39.504508,
                        longitude: -84.726578,
                    },
                    title: "Clawson Fitness Center",
                    description: "Western Campus Fitness",
                    image: Images[2],
                },
                {
                    coordinate: {
                        latitude: 39.515439,
                        longitude: -84.733123,
                    },
                    title: "NorthQuad Fitness Center",
                    description: "Martin Hall ",
                    image: Images[3],
                },
                {
                    coordinate: {
                        latitude: 39.502894,
                        longitude:  -84.738768,
                    },
                    title: "Miami Rec Sports Center",
                    description: "Main hub of Miami Recreation",
                    image: Images[0],
                },
                {

                    coordinate: {
                        latitude: 39.499011,
                        longitude: -84.744451,
                    },
                    title: "Chestnut Field House",
                    description: "Home to Functional Fitness",
                    image: Images[1],
                },
            ],
            region: {
                latitude: 39.490150,
                longitude: -84.738042,
                latitudeDelta: 0.05864195044303443,
                longitudeDelta: 0.050142817690068,

                // latitude: 39.496150,
                //longitude: -84.743142,
                //latitudeDelta: 0.05864195044303443,
                //longitudeDelta: 0.050142817690068,
            },
        };
    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }

    _renderItem = ({item}) => (
        <Facility
            id={item.id}
            title={item.title}
            hours = {item.hours}
            location={item.location}
            description = {item.description}
            address={item.address}
            image={item.image}
        />
    );
    _keyExtractor = (item, index) => item.id;

    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });
        return (

                <View style={styles.container}>
                    <View style={{marginTop: 40, flexDirection: "row", backgroundColor: "#ebebeb",
                        justifyContent:"center",
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Details')}
                            style={{alignItems:"center", flexDirection:"row", padding: 10,}}
                        >
                            <Text style={{color:"#535353", fontSize: 16, marginRight: 10}}>Explore Options</Text>
                            <Ionicons
                                name={"ios-open-outline"}
                                type={"ionicon"} size={30}
                                color={"red"}
                            />
                        </TouchableOpacity>

                    </View>
                    <MapView
                        ref={map => this.map = map}
                        initialRegion={this.state.region}
                        style={styles.container}
                    >
                        {this.state.markers.map((marker, index) => {
                            const scaleStyle = {
                                transform: [
                                    {
                                        scale: interpolations[index].scale,
                                    },
                                ],
                            };
                            const opacityStyle = {
                                opacity: interpolations[index].opacity,
                            };
                            return (
                                <MapView.Marker key={index} coordinate={marker.coordinate} title={marker.title} >
                                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                        <Animated.View style={[styles.ring, scaleStyle]} />
                                        <View style={styles.marker} />
                                    </Animated.View>
                                </MapView.Marker>
                            );
                        })}
                    </MapView>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.animation,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        style={styles.scrollView}
                        contentContainerStyle={styles.endPadding}
                    >
                        {this.state.markers.map((marker, index) => (
                            <TouchableOpacity
                                style={styles.card} key={index}
                                onPress={() => this.props.navigation.navigate('Details')}>
                                <Image
                                    source={marker.image}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    <Text numberOfLines={2} style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.ScrollView>
                </View>

        );
    }
}

export default FacilitiesScreen;

/*
<FlatList
    data={this.state.data}
    keyExtractor={this._keyExtractor}
    renderItem={this._renderItem}
/>
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "red",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "white",
        opacity: 0.4,
        position: "absolute",
        borderWidth: 1,
        borderColor: "red",
    },
});