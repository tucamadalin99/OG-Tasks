import { ScrollView, View, StyleSheet } from "react-native";
import Task from './Task';
export default function TaskList(props) {
    function onDeleteChildTask(taskId) {
        props.onDeleteParentTask(taskId);
    }

    return (
        <ScrollView style={styles.taskListContainer}>
            {props.tasks.map((task => <Task
                id={task.id}
                key={task.id}
                text={task.text}
                date={task.date}
                urgent={task.urgent}
                onDeleteTask={onDeleteChildTask}
            />))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    taskListContainer: {
        width: "100%",
    }
})