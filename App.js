import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPress = (enteredGoal, setEnteredGoal) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { uid: Math.random().toString(), value: enteredGoal }
    ]);
    setEnteredGoal('');
    setModalVisible(false);
  };

  const handleCancelPress = (setEnteredGoal) => {
    setModalVisible(false);
    setEnteredGoal('')
  }

  const handleGoalItemOnPress = (id) => {
    setCourseGoals(currentGoals => currentGoals.filter((goal) => goal.uid !== id));
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setModalVisible(true)} />
      <GoalInput handleAddPress={handleAddPress} handleCancelPress={handleCancelPress} setModalVisible={setModalVisible} visible={modalVisible}/>
      <FlatList 
        keyExtractor={(item, index) => item.uid}
        data={courseGoals}
        renderItem={itemData => 
          <GoalItem id={itemData.item.uid} title={itemData.item.value} handleGoalItemOnPress={handleGoalItemOnPress}/>
        }
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
