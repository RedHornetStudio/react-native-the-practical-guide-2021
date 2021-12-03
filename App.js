import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  console.log(fontsLoaded);

  const loadFontAsync = async () => {
    console.log('starting loading fonts');
    await Font.loadAsync({
      'open': require('./assets/fonts/OpenSans-Regular.ttf'),
      'close': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
    console.log('end loading fonts');
    setFontsLoaded(true);
  };

  if(!fontsLoaded) {
    loadFontAsync();
    return <AppLoading />
  }


  // let [fontsLoaded] = useFonts({
  //   'open': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'close': require('./assets/fonts/OpenSans-Bold.ttf'),
  // });

  // console.log(fontsLoaded);
  
  // if(!fontsLoaded) {
  //   return <AppLoading />
  // }

  console.log('fonts is loaded and app is started: ' +  fontsLoaded);

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
