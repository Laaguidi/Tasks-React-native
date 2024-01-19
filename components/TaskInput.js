import {Button, TextInput, View, StyleSheet, Modal,Image} from "react-native";
import { useState } from 'react';


function TaskInput(props){
    const [enteredTaskText, setEnteredTaskText] = useState('');
    function taskInputHandler(enteredText) {
        setEnteredTaskText(enteredText);
    }

    function addTaskHandler() {
        props.onAddTask(enteredTaskText);
        setEnteredTaskText('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/tasks.png')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Your course task!"
                    onChangeText={taskInputHandler}
                    value={enteredTaskText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Add Task" onPress={addTaskHandler} color="#be2edd" />
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} color="#ED4C67" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default TaskInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        //marginBottom: 24,
        //borderBottomWidth: 1,
        //borderBottomColor: '#cccccc',
        //backgroundColor: '#311b6b',
        backgroundColor:'#6F1E51'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        width: '100%',
        padding: 8,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    button: {
        width: 100,
        marginHorizontal: 8,
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 6
    },
});