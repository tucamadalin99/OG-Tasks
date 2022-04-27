import AllTasksPage from './pages/AllTasks';
import TaskDetails from './pages/TaskDetails';
import { NativeRouter, Switch, Route, BackButton } from 'react-router-native';
import { StyleSheet, StatusBar, Text, View, ToastAndroid } from 'react-native';

export default function App() {
  return (
    <NativeRouter>
      <BackButton>
      <Text style={{fontSize: 24, margin: 16}}>OG Tasks</Text>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Switch>
          <Route exact path='/' component={AllTasksPage} />
          <Route exact path='/taskDetails' component={TaskDetails} />
        </Switch>
        </View>
      </BackButton>
      </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24
  },
});