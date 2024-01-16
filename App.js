import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [enteredTaskText, setEnteredTaskText] = useState('');

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    setTasks((currentTasks) => [
      ...currentTasks,
      { text: enteredTaskText, id: Math.random().toString() },
    ])
  }

  return (
      <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.textInput}
              placeholder="Your course task!"
              onChangeText={taskInputHandler}
          />
          <Button title="Add Task" onPress={addTaskHandler} />
        </View>
        <View style={styles.tasksContainer}>
          <FlatList
              data={tasks}
              renderItem={(itemData) => {
                return (
                    <View style={styles.taskItem}>
                      <Text style={styles.taskText}>{itemData.item.text}</Text>
                    </View>
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  tasksContainer: {
    flex: 5,
  },
  taskItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  taskText: {
    color: 'white',
  }
});