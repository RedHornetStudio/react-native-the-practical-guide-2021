import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';

const GoalInput = ({ handleAddPress, handleCancelPress, visible, setModalVisible }) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={() => { setModalVisible(false); setEnteredGoal('') }}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={(enteredText) => setEnteredGoal(enteredText)}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={() => handleCancelPress(setEnteredGoal)} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={() => handleAddPress(enteredGoal, setEnteredGoal)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  }
});

export default GoalInput;