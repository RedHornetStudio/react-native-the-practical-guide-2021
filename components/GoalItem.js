import React from 'react';
import { StyleSheet, Text } from 'react-native';

import CustomPressableOpacity from './CustomPressableOpacity';

const GoalItem = ({ title, id, handleGoalItemOnPress }) => {
  return (
    <CustomPressableOpacity style={styles.listItem} onPress={() => handleGoalItemOnPress(id)}>
      <Text>{title}</Text>
    </CustomPressableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 1,
  }
});

export default GoalItem;