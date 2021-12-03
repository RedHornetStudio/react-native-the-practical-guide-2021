import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Keyboard, Alert } from 'react-native';

import colors from '../constants/colors';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleResetInput = () => {
    setText('');
    setConfirmed(false);
    setSelectedNumber();
  };

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(text);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 66',
        [{ text: 'Okay', style: 'destructive', onPress: handleResetInput }]
      );
      return;
    }
    setText('');
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  return (
    <Pressable style={styles.pressable} onPress={() => Keyboard.dismiss()}>
      <View style={styles.startGameScreen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.card}>
          <Text>Select a Number</Text>
          <CustomInput
            style={styles.customInput}
            value={text} onChangeText={(text) => setText(text)}
            keyboardType="number-pad"
            maxLength={2}
            inputType="numbers"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title="RESET" color={colors.accent} onPress={handleResetInput} /></View>
            <View style={styles.button}><Button title="CONFIRM" color={colors.primary} onPress={handleConfirmInput} /></View>
          </View>
        </Card>
        {confirmed && 
          <Card style={styles.confirmedNumberCard}>
            <Text>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="START GAME" onPress={() => props.handleStartGame(selectedNumber)} />
          </Card>
        }
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
  startGameScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open',
  },
  card: {
    width: '80%',
    padding: 20,
  },
  customInput: {
    width: 50,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 40,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: '40%',
  },
  confirmedNumberCard: {
    marginTop: 20,
    padding: 20,
  }
});

export default StartGameScreen;