import React from "react";
import {View, Text, StyleSheet} from 'react-native';

class ClassList extends React.Component {
    render() {
        return (
            <View style={styles.classListContainer}>
                <View style={styles.classRowInfo}>
                    <Text style={{paddingLeft: 10, paddingTop: 5, fontSize: 14, fontWeight: 'bold', color: 'red'}}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.classRowInfo}>
                    <Text style={{paddingLeft: 10, marginTop: 5, fontSize: 14, color: 'black'}}>
                        {this.props.time}
                    </Text>
                </View>
                <View style={styles.classRowInfo}>
                    <Text style={{paddingLeft: 10, marginTop: 5, fontSize: 14, color: '#ACACAC'}}>
                        {this.props.instructor}
                    </Text>
                    <Text style={{paddingLeft: 10, marginTop: 5,fontSize: 14, color: '#ACACAC'}}>
                        {this.props.location}
                    </Text>
                </View>
            </View>
        );
    }
}

export default ClassList;

const styles = StyleSheet.create({
    classListContainer: {
        flex: 1,
        paddingRight: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 4,
        shadowOffset: {width: -1, height: 1,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 3
    },
    classRowInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
});