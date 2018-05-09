import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image,} from 'react-native';

class NewsItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <TouchableOpacity>
                <View style={styles.rowContainer}>
                    <Image source={{uri: this.props.thumbnail}}
                           style={styles.thumbnail}
                           resizeMode="contain" />
                    <View style={styles.rowText}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.instructor} numberOfLines={1} ellipsizeMode ={'tail'}>
                            {this.props.instructor}
                        </Text>
                        <Text style={styles.blurb}>
                            {this.props.blurb}
                        </Text>
                        <Text style={styles.location} ellipsizeMode ={'tail'}>
                            {this.props.location}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default NewsItem;

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 'auto',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 4,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 1
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777'
    },
    instructor: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    blurb: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    location: {
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    thumbnail: {
        flex: 1,
        height: undefined,
        width: 90
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    }
});