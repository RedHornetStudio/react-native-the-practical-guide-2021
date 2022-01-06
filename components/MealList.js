import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import MealItem from '../components/MealItem';

const MealsList = props => {

  const renderListItem = itemData => {
    return (
      <MealItem 
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onPress={() => props.navigation.navigate(props.whereToNavigate, { mealId: itemData.item.id })}
      />
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        style={styles.list}
        contentContainerStyle={styles.listContentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContentContainerStyle: {

  },
});

export default MealsList;