import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
  const renderListItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        style={[styles.gridItemTile, { backgroundColor: itemData.item.color }]}
        textStyle={styles.text}
        onPress={() => props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id })}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item, index) => item.id}
      renderItem={renderListItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  gridItemTile: {
    flex: 1,
    margin: 15,
  },
  text: {
    fontSize: 18,
  },
});

export default CategoriesScreen;