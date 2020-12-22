/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View, Alert} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

var db = openDatabase({ name: 'Todos.db' });

function App() {

  const [todos, setTodos] = useState([]);
  // const [checked, setChekced] = useState(0);

  //가장 먼저 테이블 제거와 생성, 리스트를 보여주는 뷰 함수를 실행한다
  useEffect(() => {
    createTable();
    allView();
  }, []);


  //테이블 생성
  function createTable() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Todos_table'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS Todos_table', []);
            txn.executeSql(`CREATE TABLE IF NOT EXISTS Todos_table (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              textValue TEXT NOT NULL,
              checked INTEGER NOT NULL DEFAULT 0
            )`, []);
            console.log('table regen!');
          }
        });
    });
  }

  //DB의 모든 리스트 출력
  function allView() {
    db.transaction((txn) => {
      txn.executeSql(
        'SELECT * FROM Todos_table',
        [],
        (tx, res) => {
        var temp = [];
        for (var i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setTodos(temp);
      });
    }, []);
  }

  // 할일 목록 추가
  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, textValue: text, checked: 1 },
    ]);
    // Axios DB처리 // INSERT API호출
    db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO Todos_table
              (textValue, checked) 
          VALUES
              (?, 0)`,
        [text],
        function (txn, res) {
          console.log('res', res.rowsAffected);
          if (res.rowsAffected > 0) {
            Alert.alert(
              '기록 성공',
              '일정 기록 성공했습니다',
          );
      } else {
          alert('등록 실패!');
      }
        }
      );
    });
    allView(); //없으면 toggle이 false로 기록됨
  };

  function onRemove(id) {
    console.log(`App / delete id => ${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
    // Axios DB처리 // DELETE API호출
    db.transaction((txn) => {
      txn.executeSql(
          'DELETE FROM Todos_table WHERE id=?',
      [id],
      (txn, res) => {
          console.log('result :', res.rowsAffected);
          if (res.rowsAffected > 0) {
            Alert.alert(
              '삭제 성공',
              '일정 삭제했습니다',
              );
          } else {
              alert("삭제 실패");
              }
          }
      );
  });
  }

      // 다음에 더 간단하게 써보고 싶은 것 -> setChekced(
      //    checked === 0 ? 1 : 0 || checked === 1 ? 0 : 1
      //   // checked ? {0:1} : {1:0}
      // );

    const onToggle = (id, checked) => {
    console.log(`App / toggle id => ${id}`);
    console.log(`App onToggle checked => ${checked}`);
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo));
      // Axios DB처리 // UPDATE API호출
      db.transaction(function(txn) {
        if (checked === 0) {
          txn.executeSql(
            `UPDATE Todos_table
            SET checked=1 
            WHERE id=?`,
            [id],
            function(txn, res) {
              console.log('res', res.rowsAffected);
              if (res.rowsAffected > 0) {
                Alert.alert(
                  '수정 성공',
                  '일정 수정 성공했습니다',
                  );
                } else {
                  alert('수정 실패!');
                }
              });
      }
      else {
        txn.executeSql(
          `UPDATE Todos_table
              SET checked=0
            WHERE id=?`,
          [id],
          function(txn, res) {
              console.log('res', res.rowsAffected);
              if (res.rowsAffected > 0) {
                Alert.alert(
                  '수정 성공',
                  '일정 수정 성공했습니다',
                  );
                } else {
                  alert('수정 실패!');
                }
              });
            }
          });
          allView();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text children="할일 목록" style={styles.appTitle} />
        <View style={styles.card}>
          <TodoInsert onAddTodo={addTodo} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162955',
  },
  appTitle: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    fontSize: 17,
    margin: 20,
  },
});

export default App;
