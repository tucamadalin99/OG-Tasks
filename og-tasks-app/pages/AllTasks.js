import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import Task from '../components/Task'

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = "https://tmw-app-12422-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

  useEffect(() => { 
    fetch(
      apiUrl
    ).then(response => {
      return response.json();
    }).then(data => {
      const tasks = [];

      for (const key in data) {
        const task = {
          id: key,
          ...data[key]
        };
        tasks.push(task);
      } 

      setTasks(tasks);
    });
   }, []);
  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} />
      <Button title='Add Task'></Button>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    
  },
});