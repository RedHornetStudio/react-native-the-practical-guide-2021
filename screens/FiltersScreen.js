import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import ParagraphText from '../components/ParagraphText';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import sharedStyles from '../shared/sharedStyles';
import HeaderText from '../components/HeaderText';
import colors from '../constants/colors';

const FilterSwitch = props => {
  return (
    <View style={styles.filter}>
      <ParagraphText>{props.label}</ParagraphText>
      <Switch 
        value={props.value}
        onValueChange={props.onValueChange}
        thumbColor={props.value ? colors.primaryColor : '#d9d9d9'}
        trackColor={{ false: '#999', true: colors.lightPrimaryColor}}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);

  const saveFilters = () => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactosefree: isLactoseFree,
      vegan: isVegan,
      vegeterian: isVegeterian,
    };
    console.log(appliedFilters);
  };

  // adding menu button to header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <CustomPressableOpacity style={sharedStyles.menuButton} onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="ios-menu" size={23} color="white" />
        </CustomPressableOpacity>
      ),
      headerRight: () => (
        <CustomPressableOpacity onPress={() => saveFilters()}>
          <ParagraphText style={styles.saveButton}>SAVE</ParagraphText>
        </CustomPressableOpacity>
      ),
    });
  }, [props.navigation, isGlutenFree, isLactoseFree, isVegan, isVegeterian]);

  return (
    <View style={styles.screen}>
      <HeaderText style={styles.title}>Available Filters / Restrictions</HeaderText>
      <View style={styles.filtersContainer}>
        <FilterSwitch label="Gluten-free" value={isGlutenFree} onValueChange={value => setIsGlutenFree(value)} />
        <FilterSwitch label="Lactose-free" value={isLactoseFree} onValueChange={value => setIsLactoseFree(value)} />
        <FilterSwitch label="Vegan" value={isVegan} onValueChange={value => setIsVegan(value)} />
        <FilterSwitch label="Vegeterian" value={isVegeterian} onValueChange={value => setIsVegeterian(value)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  filtersContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    color: 'white',
    fontSize: 15,
  },
});

export default FiltersScreen;