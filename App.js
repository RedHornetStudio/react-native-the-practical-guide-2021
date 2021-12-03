import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const handleStartNewGame = () => {
    setUserNumber();
    setGuessRounds(0);
  }

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const handleGameOver = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen handleStartGame={handleStartGame}/>

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} handleGameOver={handleGameOver} />
  } else if(guessRounds > 0) {
    content = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} handleStartNewGame={handleStartNewGame} />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
