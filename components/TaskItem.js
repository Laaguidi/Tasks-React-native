import { StyleSheet, View, Text,Pressable } from 'react-native';

function TaskItem(props) {
    return (

            <Pressable
                onPress={props.onDeleteItem.bind(this, props.id)}
                style={({ pressed }) => pressed && styles.pressedItem}
                android_ripple={{ color: '#210644' }}
            >
                <View style={styles.taskItem}>
                    <Text style={styles.taskText}>{props.text}</Text>
                </View>
            </Pressable>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    taskText: {
        padding: 8,
        color: 'white',
    },
    pressedItem: {
        opacity: 0.5,
    },
});