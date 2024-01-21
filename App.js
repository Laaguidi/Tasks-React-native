import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
    Button,
    Text,
    Dimensions,
    FlatList,
} from 'react-native';
import TaskItem from './components/TaskItem';
import TaskInput from "./components/TaskInput";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

    function addTaskHandler(enteredTaskText) {
        // Validate if enteredTaskText contains at least one letter and not empty
        const hasLetter = /[a-zA-Z]/.test(enteredTaskText);
        const isEmpty = enteredTaskText.trim() === '';

        if (hasLetter && !isEmpty) {
            setTasks((currentTasks) => [
                ...currentTasks,
                { text: enteredTaskText, id: Math.random().toString() },
            ]);
            endAddTaskHandler();
        } else {
            // Invalid input
            alert('Please enter a valid task (should contain at least one letter and not empty)');
        }
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
      <StatusBar backgroundColor="#6F1E51" />
      <View style={styles.appContainer}>
        {/*  <Button
              title="Add New Task"
              color="#5758BB"
              onPress={startAddTaskHandler}
              style={{ fontSize: deviceWidth < 380 ? 12 : 24 }}
          />*/}
          {/*  add */}
          <Text
              style={[styles.button, { fontSize: deviceWidth < 500 ? 21 : 30 }]}
              onPress={startAddTaskHandler}
          >
              Add New Task
          </Text>
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
//add
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
      backgroundColor: '#6F1E51',
      fontSize: deviceWidth < 380 ? 12 : 24,
  },

  tasksContainer: {
    flex: 5,
  },

    //add
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
    },
    //add
    button: {
        backgroundColor: '#5758BB',
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 82,
        borderRadius: 6,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 10,
    },

});