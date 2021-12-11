import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

// const renderListItem = (value, numOfRounds) => {
//   return (
//     <View key={value} style={styles.listItem}>
//       <BodyText>#{numOfRounds}</BodyText>
//       <BodyText>{value}</BodyText>
//     </View>
//   );
// };

const renderItem = (length, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{length - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [pastGuesses, setPastGuesses] = useState([currentGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, handleGameOver } = props;

  useEffect(() => {
    if(currentGuess === userChoice) {
      handleGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, handleGameOver]);

  const handleNextGuess = direction => {
    if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You konw that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if(direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(pastGuesses => [nextNumber, ...pastGuesses]);
  }

  let listStyle = styles.list;
  if(Dimensions.get('window').width < 350) {
    listStyle = styles.listBig;
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => handleNextGuess('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => handleNextGuess('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          renderItem={(itemData) => renderItem(pastGuesses.length, itemData)}
          keyExtractor={item => item}
          contentContainerStyle={listStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    maxWidth: '80%',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    padding: 20,
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: '10%',
    justifyContent: 'flex-end',
  },
  listBig: {
    flexGrow: 1,
    paddingHorizontal: '5%',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default GameScreen;