import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import TaskButton from './TaskButton';
import { Link, useHistory } from 'react-router-native';

export default function Task(props) {
    const history = useHistory();

    function navigateToDetails() {
        history.push({
            pathname: "/taskDetails",
            state: props
        })
    }

    return <View style={styles.taskWrapper}>
        <View style={styles.contentContainer} onTouchEnd={navigateToDetails}>
            <Text>{props.text}</Text>
            <Text style={styles.dueContainer}>{props.date}</Text>
        </View>
        <View style={styles.actionsWrapper}>
            <TaskButton title="✓" bgColor="#178f37" textColor="white" />
            <TaskButton title="✖" bgColor="#d9000b" textColor="white"/>
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
        backgroundColor: "#dfe1f0"
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
    }

})