import React from 'react';
import {
    StyleSheet, Button,
    Image, Text, View,
    StatusBar, TouchableWithoutFeedback,
    ScrollView, TouchableOpacity, FlatList  } from 'react-native';


class CategoryScreen extends React.Component {

    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView>
                <StatusBar barStyle = "default"/>

                <Image
                    style={styles.categoryThumb}
                    source={params.image}
                />
                <Text>{params.title}</Text>
                <Text>{params.summary}</Text>
                <Text>Options: {params.options}</Text>

            </ScrollView>
        );
    }
}

export default CategoryScreen;

const styles = StyleSheet.create({

    dayCardView:{
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 5,
        paddingLeft: 20,
        shadowOffset:{  width: -1.5,  height: -1.5,  },
        shadowColor: '#343434',
        shadowOpacity: 3.0,
        shadowRadius: 3,
        //backgroundColor: 'black'
    },
    categoryThumb:{
        width: 220,
        height: 175,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
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
    subHeader:{
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});