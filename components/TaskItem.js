import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';

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
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    taskItem: {
        margin: 8,
        borderRadius: 6,
        //backgroundColor: '#B53471',
        backgroundColor:'#fab1a0',
        padding: deviceWidth < 380 ? 12 : 9,
    },
    taskText: {
        padding: 8,
        color: 'black',
    },
    pressedItem: {
        opacity: 0.5,
    },

});