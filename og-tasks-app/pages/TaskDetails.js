import { useLocation } from "react-router-native";
import { Text, TextInput, View, Switch, StyleSheet, Button } from "react-native";
import { useState, useEffect } from 'react';
import { ToastAndroid } from "react-native";
import { useHistory } from "react-router-native";

export default function TaskDetailsPage() {
    const apiUrl = "https://tmw-app-12422-default-rtdb.europe-west1.firebasedatabase.app/tasks";
    const history = useHistory();
    const location = useLocation();
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskUrgent, setTaskUrgent] = useState(false);
    const [taskDone, setTaskDone] = useState(false);
    let isEditing = false;

    const toggleUrgentSwitch = () => setTaskUrgent(previousState => !previousState);

    function handleSubmit() {
        if (!taskText || taskText.length < 3) {
            ToastAndroid.show("Invalid Task Text!", ToastAndroid.SHORT);
        }
        if (!taskDate || taskText.length < 3) {
            ToastAndroid.show("Invalid Date format!", ToastAndroid.SHORT);   
        } else {

            const newTask = {
                text: taskText,
                date: taskDate,
                urgent: taskUrgent,
                done: taskDone
            }

            if (location.state) {
                fetch(`${apiUrl}/${location.state.id}.json`, {
                    method: "PUT",
                    body: JSON.stringify(newTask),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    ToastAndroid.show("Task edited!", ToastAndroid.SHORT);
                    history.push('/');
                });
            } else {
                fetch(`${apiUrl}.json`, {
                    method: "POST",
                    body: JSON.stringify(newTask),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    ToastAndroid.show("Task added!", ToastAndroid.SHORT);
                    history.push('/');
              })
            }
        }

    }


    useEffect(() => {
        if (location.state && location.state.id !== "") {
            isEditing = true;
            setTaskText(location.state.text);
            setTaskDate(location.state.date);
            setTaskUrgent(location.state.urgent);
            setTaskDone(location.state.done);
        }
     }, []);
        return (
            <View style={styles.formContainer}>
                <Text>Task name</Text>
                <TextInput onChangeText={(text) => setTaskText(text)} style={styles.inputField} value={taskText}></TextInput>
                <Text>Due date</Text>
                <TextInput onChangeText={(text) => setTaskDate(text)} style={styles.inputField} value={taskDate}></TextInput>
                <Text>Urgent</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={taskUrgent ? "#d90000" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleUrgentSwitch}
                    value={taskUrgent}
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} title="Submit"></Button>
                </View>
            </View>
        );

}

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        padding: 24,
        display: "flex",
        alignItems: "flex-start"
    },
    inputField: {
        borderWidth: 1,
        borderColor: "#c9c9c9",
        borderRadius: 4,
        height: 48,
        padding: 16,
        width: "100%",
        marginBottom: 8
    },
    buttonContainer: {
        width: "100%"
    }
})