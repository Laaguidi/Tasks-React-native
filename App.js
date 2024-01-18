import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
    Button,
  FlatList,
} from 'react-native';
import TaskItem from './components/TaskItem';
import TaskInput from "./components/TaskInput";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addTaskHandler(enteredTaskText) {

    setTasks((currentTasks) => [
      ...currentTasks,
      { text: enteredTaskText, id: Math.random().toString()},
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

 ////:::::::::
    async function loadTasks() {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async function saveTasks() {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

// Call these functions as needed
// For example, to load tasks when the component mounts:
    useEffect(() => {
        loadTasks();
    }, []);

// To save tasks whenever they change:
    useEffect(() => {
        saveTasks();
    }, [tasks]);




  return (
      <>
      <StatusBar backgroundColor="#6F1E51"/>
      <View style={styles.appContainer}>
          <Button
              title="Add New Task"
              color="#5758BB"
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