/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';

import {StyleSheet, TextInput, View, Button, Form} from 'react-native';


const TodoInsert = ({onAddTodo}) => {

  const [newTodoItem, setNewTodoItem] = useState('');

  const handleTodoInput = (newTodo) => {
    setNewTodoItem(newTodo);
  };

  function handleAddTodo() {
    if (newTodoItem === '') {
      return;
    }

    console.log(`newTodoItem => ${newTodoItem}`);
    onAddTodo(newTodoItem.replace('\n', ' '));
    setNewTodoItem('');

  }


  // const handleKeyPress = (e) => {
  //   if (e.nativeEvent.key === 'Enter') {
  //     handleAddTodo();
  //   }
  // };

  // const onChange = useCallback(
  //   e => {
  //     // onAddTodo(newTodoItem);
  //     // setNewTodoItem('');

  //     e.preventDefault();
  //   },
  //   // [onAddTodo, newTodoItem],
  //   [],
  // );

  return (

    <View style={styles.inputContainer} >
      <TextInput
                style={styles.input}
                placeholder={'할일을 입력하세요'}
                autoCorrect={true}
                value={newTodoItem}
                onChangeText={handleTodoInput}
                // onKeyPress={handleKeyPress}
                />
      <View style={styles.button}>
      <Button title={'ADD'}
              onPress={handleAddTodo} />

            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
      flexDirection: 'row',
      alignItems : 'center',
      justifyContent :'space-between',
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    fontSize: 17,
    marginLeft: 20,
    width: '75%',
  },
  button: {
      marginRight :20,
  },
});

export default TodoInsert;
