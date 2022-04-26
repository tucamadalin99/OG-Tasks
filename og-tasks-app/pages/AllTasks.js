import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import Task from '../components/Task'
import { useHistory } from 'react-router-native';
import { ToastAndroid } from 'react-native';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
  const apiUrl = "https://tmw-app-12422-default-rtdb.europe-west1.firebasedatabase.app/tasks";

  useEffect(() => { 
    fetch(
      `${apiUrl}.json`
    ).then(response => {
      return response.json();
    }).then(data => {
      const tasks = [];

      for (const key in data) {
        const task = {
          id: key,
          ...data[key]
        };
        if (task.urgent) {
          tasks.unshift(task);
        } else {
          tasks.push(task);
        }
      } 

      setTasks(tasks);
    });
  }, []);
  
  function navigateToForm() {
    history.push("/taskDetails");
  }

  function doneHandler(taskId) {
    const foundDoneTask = tasks.find(el => el.id === taskId);
    const filteredTasks = tasks.filter(el => el.id !== taskId)
    filteredTasks.push(foundDoneTask);
    setTasks(filteredTasks);
  }

  function deleteHandler(taskId) {
    fetch(`${apiUrl}/${taskId}.json`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      ToastAndroid.show("Task deleted!", ToastAndroid.SHORT);
      const filteredTasks = tasks.filter((el) => el.id !== taskId);
      setTasks(filteredTasks);
    })
  }

  return (
    <View style={styles.container}>
      <TaskList onDoneParentTask={doneHandler} onDeleteParentTask={deleteHandler} tasks={tasks} />
      <Button onPress={navigateToForm} title='Add Task'></Button>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    
  },
});