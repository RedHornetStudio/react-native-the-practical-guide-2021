import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import ParagraphText from '../components/ParagraphText';
import HeaderText from '../components/HeaderText';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import CustomPressableRipple from '../components/CustomPressableRipple';
import colors from '../constants/colors';
import { mealDeleted } from '../features/mealsSlice';
import { mealAddedToFavoriteMeals } from '../features/favoriteMealsSlice';
import { mealDeletedFromFavoriteMeals } from '../features/favoriteMealsSlice';

const MealDetailScreen = props => {
  console.log('Meal detail screen rerendered');
  const dispatch = useDispatch();

  let DeleteButton = CustomPressableOpacity;
  if(Platform.OS === 'android') DeleteButton = CustomPressableRipple;

  const availableMeals = useSelector(state => state.mealsReducer.meals);
  const favoriteMeals = useSelector(state => state.favoriteMealsReducer.favoriteMeals);
  const mealDetails = availableMeals.find(meal => meal.id === props.route.params.mealId);

  useLayoutEffect(() => {
    console.log('useLayoutEffectHook');
    const color = favoriteMeals.includes(props.route.params.mealId) ? 'black' : 'white';
    props.navigation.setOptions({
      headerRight: () => (
        <CustomPressableOpacity onPress={() => toggleFavorites()}>
          <Ionicons name="ios-star" size={23} color={color} />
        </CustomPressableOpacity>
      ),
      title: mealDetails ? mealDetails.title : undefined,
    });
  }, [props.navigation, favoriteMeals]);

  if (!mealDetails) {
    return (
      <View style={styles.noSuchMeal}>
        <ParagraphText style={styles.noSuchMealText}>No such meal!</ParagraphText>
      </View>
    );
  }

  const deleteMeal = () => {
    // simulate deletion of meal by using setTimeout(), and updating state after succesful deletion
    setTimeout(() => {
      dispatch(mealDeleted(props.route.params.mealId));
      dispatch(mealDeletedFromFavoriteMeals(props.route.params.mealId));
    }, 3000);
  };

  const toggleFavorites = () => {
    if(favoriteMeals.includes(props.route.params.mealId)) {
      // simulate deleting favorite meal id from database with setTimeout(), and updating state after succesful adding
      setTimeout(() => {
        console.log('meal deleted from favorites: ' + props.route.params.mealId);
        dispatch(mealDeletedFromFavoriteMeals(props.route.params.mealId));
      }, 3000);
    } else {
      // simulate adding favorite meal id to database with setTimeout(), and updating state after succesful adding
      setTimeout(() => {
        console.log('meal added to favorites: ' + props.route.params.mealId);
        dispatch(mealAddedToFavoriteMeals(props.route.params.mealId));
      }, 3000);
    }
  };

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
      <DeleteButton style={styles.deleteButton} onPress={() => deleteMeal()}><ParagraphText style={styles.deleteButtonText}>Delete Meal</ParagraphText></DeleteButton>
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
  deleteButton: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.primaryColor,
  },
  deleteButtonText: {
    color: 'white',
  },
  noSuchMeal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSuchMealText: {
    fontSize: 30,
  }
});

export default MealDetailScreen;