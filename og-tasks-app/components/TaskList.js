import { ScrollView, View, StyleSheet } from "react-native";
import Task from './Task';
export default function TaskList(props) {
    return (
        <ScrollView style={styles.taskListContainer}>
            {props.tasks.map((task => <Task
                key={task.id}
                text={task.text}
                date={task.date} />))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    taskListContainer: {
        width: "100%",
    }
})