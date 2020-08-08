import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Header from './components/Header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import Sandbox from './components/Sandbox';

export default App = () => {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', id: '1' },
    { text: 'create an app', id: '2' },
    { text: 'play on the switch', id: '3' }
  ])

  const pressHandler = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id)
    })
  }
  
  const submitHandler = text => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [
          { text, id: Math.random().toString() },
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('OOOPS!', 'Todos must be over 3 characters long.', [
        {
          text: 'Understood',
          onPress: () => console.log('Alert closed')
        }
      ])
    }
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    marginTop: 20,
    flex: 1,
  }
});
