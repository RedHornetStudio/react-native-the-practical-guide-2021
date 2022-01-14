import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import ParagraphText from '../components/ParagraphText';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import sharedStyles from '../shared/sharedStyles';
import HeaderText from '../components/HeaderText';
import colors from '../constants/colors';
import { filtersChanged } from '../features/filtersSlice';

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
  console.log('Filters screen rerendered');
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);

  const filters = useSelector(state => state.filtersReducer.filters);
  const filtersArr = JSON.parse(filters);
  // console.log(isGlutenFree, isLactoseFree, isVegan, isVegeterian);
  // console.log(filters);

  const dispatch = useDispatch();

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

  useEffect(() => {
    console.log('aaa');
    setIsGlutenFree(filtersArr.indexOf('isGlutenFree') >= 0);
    setIsLactoseFree(filtersArr.indexOf('isLactoseFree') >= 0);
    setIsVegan(filtersArr.indexOf('isVegan') >= 0);
    setIsVegeterian(filtersArr.indexOf('isVegeterian') >= 0);
  }, [filters]);

  const saveFilters = () => {
    const filtersArray = [];
    if (isGlutenFree) filtersArray.push('isGlutenFree');
    if (isLactoseFree) filtersArray.push('isLactoseFree');
    if (isVegan) filtersArray.push('isVegan');
    if (isVegeterian) filtersArray.push('isVegeterian');
    setTimeout(() => {
      dispatch(filtersChanged(filtersArray));
    }, 5000);
  };

  return (
    <View style={styles.screen}>
      <HeaderText style={styles.title}>Available Filters / Restrictions</HeaderText>
      <View style={styles.filtersContainer}>
        <FilterSwitch label="Gluten-free" value={isGlutenFree} onValueChange={value => {setIsGlutenFree(value); console.log(value)}} />
        <FilterSwitch label="Lactose-free" value={isLactoseFree} onValueChange={value => {setIsLactoseFree(value); console.log(value)}} />
        <FilterSwitch label="Vegan" value={isVegan} onValueChange={value => {setIsVegan(value); console.log(value)}} />
        <FilterSwitch label="Vegeterian" value={isVegeterian} onValueChange={value => {setIsVegeterian(value); console.log(value)}} />
      </View>
      <CustomPressableOpacity onPress={saveFilters}><HeaderText>save filters</HeaderText></CustomPressableOpacity>
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