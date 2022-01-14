import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import sharedStyles from '../shared/sharedStyles';

const CategoriesScreen = props => {
  console.log('Categories screen rerender');

  // adding menu button to header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <CustomPressableOpacity style={sharedStyles.menuButton} onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="ios-menu" size={23} color="white" />
        </CustomPressableOpacity>
      ),
    });
  }, [props.navigation]);

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