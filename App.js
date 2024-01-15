import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [enteredTaskText, setEnteredTaskText] = useState('');

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    console.log(enteredTaskText);
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
          <Text>List of goals...</Text>
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
});