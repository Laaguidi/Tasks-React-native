import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
    Button,
  FlatList,
} from 'react-native';
import TaskItem from './components/TaskItem';
import TaskInput from "./components/TaskInput";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addTaskHandler(enteredTaskText) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { text: enteredTaskText, id: Math.random().toString() },
    ])
      endAddTaskHandler();
  }

    function startAddTaskHandler() {
        setModalIsVisible(true);
    }

    function endAddTaskHandler() {
        setModalIsVisible(false);
    }

    function deleteTaskHandler(id) {
        setTasks((currentTasks) => {
            return currentTasks.filter((task) => task.id !== id);
        });
    }

  return (
      <>
      <StatusBar style="black"/>
      <View style={styles.appContainer}>
          <Button
              title="Add New Task"
              color="#a065ec"
              onPress={startAddTaskHandler}
          />
        <TaskInput
            visible={modalIsVisible}
            onAddTask={addTaskHandler}
            onCancel={endAddTaskHandler}
        />
        <View style={styles.tasksContainer}>
          <FlatList
              data={tasks}
              renderItem={(itemData) => {
                return (
                    <TaskItem
                        text={itemData.item.text}
                        onDeleteItem={deleteTaskHandler}
                        id={itemData.item.id}
                    />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
          />
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  tasksContainer: {
    flex: 5,
  },
});