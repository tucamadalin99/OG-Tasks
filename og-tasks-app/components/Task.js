import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ToastAndroid } from 'react-native';
import { useHistory } from 'react-router-native';
import { useState, useEffect } from 'react';

export default function Task(props) {
    const history = useHistory();
    const apiUrl = "https://tmw-app-12422-default-rtdb.europe-west1.firebasedatabase.app/tasks";
    const [isDone, setIsDone] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        setIsUrgent(props.urgent);
     }, []);

    function navigateToDetails() {
        history.push({
            pathname: "/taskDetails",
            state: props
        })
    }

    function handleDone() {
        props.onDoneTask(props.id);
        setIsDone(!isDone);
    }

    function handleDelete() {
        props.onDeleteTask(props.id);
    }

    return <View style={[styles.taskWrapper, {backgroundColor: isDone ? "#a2ff9c" : "#dfe1f0"}, {borderLeftWidth: isUrgent ? 2 : 0}, {borderLeftColor: isUrgent ? "red" : "none"}]}>
        <View style={styles.contentContainer} onTouchEnd={navigateToDetails}>
            <Text>{props.text}</Text>
            <Text style={styles.dueContainer}>{props.date}</Text>
        </View>
        <View style={styles.actionsWrapper}>
            <TouchableOpacity onPress={handleDone} style={[{backgroundColor: "#178f37"}, styles.buttonWrapper]}>
                <Text style={{color: "white"}}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={[{backgroundColor: "#d9000b"}, styles.buttonWrapper]}>
                <Text style={{color: "white"}}>✖</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    taskWrapper: {
        borderRadius: 8,
        padding: 16,
        margin: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    actionsWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    buttons: {
       marginLeft: 8
    },
    contentContainer: {
        width: "70%"
    },
    dueContainer: {
        color: "gray"
    },
      buttonWrapper: {
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        marginLeft: 8
    }

})