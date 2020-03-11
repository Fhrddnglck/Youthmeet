import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
    state = {
        value: null,
    };

    render() {
        const { options } = this.props;
        const { value } = this.state;

        return (
            <View>
                {options.map(item => {
                    return (
                        <View key={item.key} style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.circle,{borderColor:item.text=='Female'?'pink':'blue'}]}
                                onPress={() => {
                                    this.props.currentChoose(item.key)
                                    this.setState({value: item.key});
                                }}
                            >
                                {value === item.key && <View style={styles.checkedCircle} />}
                            </TouchableOpacity>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>{item.text}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:24
    },

    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:16
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#794F9B',
    },
});