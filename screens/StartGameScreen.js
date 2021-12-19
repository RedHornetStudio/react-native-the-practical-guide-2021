import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import colors from '../constants/colors';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  // styles based on orientation
  const [buttonFontSize, setButtonFontSize] = useState(Dimensions.get('window').width < 350 ? 10 : undefined);
  useEffect(() => {
    const updateLayout = () => setButtonFontSize(Dimensions.get('window').width < 350 ? 10 : undefined);
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

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
    <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps={'handled'}>
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="height"> */}
        <Pressable style={styles.pressable} onPress={() => Keyboard.dismiss()}>
          <View style={styles.startGameScreen}>
            <TitleText>Start a New Game!</TitleText>
            <Card style={styles.card}>
              <BodyText>Select a Number</BodyText>
              <CustomInput
                style={styles.customInput}
                value={text} onChangeText={(text) => setText(text)}
                keyboardType="number-pad"
                maxLength={2}
                inputType="numbers"
              />
              <View style={styles.buttonContainer}>
                <MainButton style={[styles.button, styles.resetButton]} textStyle={{ fontSize: buttonFontSize }} onPress={handleResetInput}>RESET</MainButton>
                <MainButton style={styles.button} textStyle={{ fontSize: buttonFontSize }} onPress={handleConfirmInput}>CONFIRM</MainButton>
              </View>
            </Card>
            {confirmed && 
              <Card style={styles.confirmedNumberCard}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.handleStartGame(selectedNumber)}>START GAME</MainButton>
              </Card>
            }
          </View>
        </Pressable>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  pressable: {
    flex: 1,
  },
  startGameScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'flex-end',
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
    paddingHorizontal: 0,
    width: '40%',
  },
  resetButton: {
    backgroundColor: colors.accent,
  },
  confirmedNumberCard: {
    marginTop: 20,
    padding: 20,
  }
});

export default StartGameScreen;