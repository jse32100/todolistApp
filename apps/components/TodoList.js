/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

import TodoItem from './TodoItem';


function TodoList({ todos, onRemove, onToggle }) {

    const newListItems = todos.map((item, index) =>
     <TodoItem key={index} id={item.id} onRemove={onRemove} onToggle={onToggle} textValue={item.textValue} checked={item.checked} />
    );

    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {newListItems}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    listContainer : {
        alignItems: 'center',
    },

});

export default TodoList;
