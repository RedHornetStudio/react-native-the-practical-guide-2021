import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import MealItem from '../components/MealItem';
import { MEALS } from '../data/dummy-data';

const CategoryMealsScreen = props => {
  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(props.route.params.categoryId) >= 0);

  const renderListItem = itemData => {
    return (
      <MealItem 
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onPress={() => props.navigation.navigate('MealDetail', { mealId: itemData.item.id })}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        style={styles.list}
        contentContainerStyle={styles.listContentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContentContainerStyle: {

  },
});

export default CategoryMealsScreen;