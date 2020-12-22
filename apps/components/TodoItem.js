/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';


const TodoItem = ({id, textValue, checked, onRemove, onToggle}) => {
    // console.log(`checked = ${checked}`);


    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => onToggle(id, checked)}>
                {checked ? (
                    <View style={styles.checkedCircle} >
                    <Icon1 name="checksquareo" size={30} color="#2E4172" />
                </View>
                )
            : (
                <View style={styles.circle} />
            )}
            </TouchableOpacity>
            <Text
                children={textValue}
                style={[styles.itemText,
                checked ? styles.strikeText : styles.unstrikeText ]} />
            <TouchableOpacity onPress={() => onRemove(id)}  >
                <View style={styles.delete}>
                    <Icon2 name="delete-forever" size={30} color="#C51B45" />
                </View>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    itemContainer : {
        flex: 1,
        borderBottomColor: '#bbbbbb',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
    },
    circle : {
        marginLeft: 20,
        marginRight: 20,
        width: 27,
        height: 27,
        borderColor: '#2E4172',
        borderWidth: 2,
        borderRadius:2,
    },
    checkedCircle: {
        marginLeft: 18,
        marginRight: 20,
    },
    itemText : {
        flex: 1,
        fontSize: 15,
        marginVertical: 15,
    },
    strikeText :{
        color : '#9e9e9e',
        textDecorationLine: 'line-through',
    },
    unstrikeText : {
        color : '#222222',
    },
    delete: {
        marginLeft: 20,
        marginRight: 20,
    },
});

export default TodoItem;
