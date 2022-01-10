import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import ParagraphText from '../components/ParagraphText';
import HeaderText from '../components/HeaderText';
import CustomPressableOpacity from '../components/CustomPressableOpacity';

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.mealsReducer.meals);
  const mealDetails = availableMeals.find(meal => meal.id === props.route.params.mealId);

  if (!mealDetails) {
    return (
      <View>
        <Text>No such meal!</Text>
      </View>
    );
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <CustomPressableOpacity onPress={() => console.log(`Meal with id ${props.route.params.mealId} added to favorites`)}>
          <Ionicons name="ios-star" size={23} color="white" />
        </CustomPressableOpacity>
      ),
    });
  }, [props.navigation]);

  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{ uri: mealDetails.imageUrl }} />
      <View style={styles.details}>
        <ParagraphText>{mealDetails.duration}m</ParagraphText>
        <ParagraphText>{mealDetails.complexity.toUpperCase()}</ParagraphText>
        <ParagraphText>{mealDetails.affordability.toUpperCase()}</ParagraphText>
      </View>
      <HeaderText style={styles.headerText}>Ingridients</HeaderText>
      {mealDetails.ingridients.map(ingridient => (
        <View style={styles.listItem} key={ingridient}>
          <ParagraphText>{ingridient}</ParagraphText>
        </View>
      ))}
      <HeaderText style={styles.headerText}>Steps</HeaderText>
      {mealDetails.steps.map(step => (
        <View style={styles.listItem} key={step}>
          <ParagraphText>{step}</ParagraphText>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rightButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  screen: {

  },
  image: {
    height: 200,
    backgroundColor: 'blue',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
  },
  listItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default MealDetailScreen;