import { StyleSheet, View, Text } from 'react-native';

function TaskItem(props) {
    return (
        <View style={styles.taskItem}>
            <Text style={styles.taskText}>{props.text}</Text>
        </View>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    taskText: {
        color: 'white',
    },
});