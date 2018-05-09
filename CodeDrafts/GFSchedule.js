
import React from 'react';
import {
    StyleSheet, Image, Text, View, Dimensions, Animated,
    ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import CategoryData from '../data/ClassCategories';
import ClassData from '../data/GFClassData';

import ScheduleItem from '../components/ScheduleItem';
import {Entypo} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import InfiniteScrollView from 'react-native-infinite-scroll-view';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


class ScheduleScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: ClassData,
            items: []
        };
    }
    componentDidMount() {
        this.setState({
            items: [
                { title: 'Monday', css: styles.daySlide },
                { title: 'Tuesday', css: styles.daySlide },
                { title: 'Wednesday', css: styles.daySlide },
                { title: 'Thursday', css: styles.daySlide },
                { title: 'Friday', css: styles.daySlide },
                { title: 'Saturday', css: styles.daySlide },
                { title: 'Sunday', css: styles.daySlide },
            ],
            currentPosition: 0,
        })
    }


    _renderItem = ({item, index}) => (

        <View>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ClassDetail', item)}
                key={this._keyExtractor}
            >
                <ScheduleItem
                    id={item.id}
                    title={item.title}
                    time = {item.time}
                    days={item.days}
                    instructor={item.instructor}
                    location={item.location}
                    thumbnail={item.image}
                />
            </TouchableOpacity>
        </View>
    );

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#ffffff',
                width:Dimensions.get('window').width,
                //opacity: 0.5,
            }}>


                    <ScrollView horizontal={true} pagingEnabled>
                        <View style={{display: 'flex', flexDirection:'row'}}>
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
                                        data={this.state.data}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    />
                                    <View style={{margin:0,}}/>

                                </View>
                            ))}
                        </View>
                    </ScrollView>
                <View>
                    <View style={{backgroundColor: '#343434', height: 30}}>
                        <Text style={{fontSize: 20, fontWeight: '300', justifyContent: 'center', alignSelf: 'center', color: 'white'}}>
                            {'Class Types'}
                        </Text>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    decelerationRate={0}
                    snapToAlignment={'start'}

                >
                    <View style={{display: 'flex', flexDirection:'row'}}>
                        {CategoryData.map((category, index) => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('CategoryDetail', category)}
                                key={index}
                            >
                                <Image
                                    style={styles.categoryThumb}
                                    source={category.image}
                                    key={index}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

            </ScrollView>

        );
    }
}
export default ScheduleScreen;

const styles = StyleSheet.create({

    wrapper:{},
    daySlide:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
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
    subHeader:{
        paddingTop: 8,
        paddingBottom: 5,
        paddingLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryThumb:{
        width: 140,
        height: 100,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 10,
    },
    dayCardView:{
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 20,
        paddingLeft: 20,
        shadowOffset:{  width: -1.5,  height: -1.5,  },
        shadowColor: '#343434',
        shadowOpacity: 3.0,
        shadowRadius: 3,
    },

    dayCard: {
        height: 'auto',
        width: 'auto',
        display: 'flex',
        flexDirection:'row',
        marginLeft: 20,
        marginRight: 10,

    },
    daysOfWeekText:{
        height: 30,
        paddingLeft: 20,
        color: 'white',
        backgroundColor: '#343434',
        alignSelf: 'center',
        width: '100%',
        fontSize: 24,
        shadowOffset:{  width: 3.5,  height: 2.5,  },
        shadowColor: '#343434',
        shadowOpacity: 2.0,
        shadowRadius: 3,
    },

});
