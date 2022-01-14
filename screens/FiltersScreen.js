import React, { useLayoutEffect, useState, useEffect, useReducer } from 'react';
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

  const filtersString = useSelector(state => state.filtersReducer.filters);
  const filters = JSON.parse(filtersString);

  const dispatch = useDispatch();

  // adding menu button to header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <CustomPressableOpacity style={sharedStyles.menuButton} onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="ios-menu" size={23} color="white" />
        </CustomPressableOpacity>
      ),
      headerRight: () => (
        <CustomPressableOpacity onPress={saveFilters}>
          <ParagraphText style={styles.saveButtonText}>SAVE</ParagraphText>
        </CustomPressableOpacity>
      ),
    });
  }, [props.navigation, isGlutenFree, isLactoseFree, isVegan, isVegeterian]);

  useEffect(() => {
    setIsGlutenFree(filters.indexOf('isGlutenFree') >= 0);
    setIsLactoseFree(filters.indexOf('isLactoseFree') >= 0);
    setIsVegan(filters.indexOf('isVegan') >= 0);
    setIsVegeterian(filters.indexOf('isVegeterian') >= 0);
  }, [filtersString]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('Focus of filters screen');
      setIsGlutenFree(filters.indexOf('isGlutenFree') >= 0);
      setIsLactoseFree(filters.indexOf('isLactoseFree') >= 0);
      setIsVegan(filters.indexOf('isVegan') >= 0);
      setIsVegeterian(filters.indexOf('isVegeterian') >= 0);
    });

    return unsubscribe;
  }, [props.navigation, filtersString]);

  const saveFilters = () => {
    const filtersArray = [];
    if (isGlutenFree) filtersArray.push('isGlutenFree');
    if (isLactoseFree) filtersArray.push('isLactoseFree');
    if (isVegan) filtersArray.push('isVegan');
    if (isVegeterian) filtersArray.push('isVegeterian');
    setTimeout(() => {
      dispatch(filtersChanged(JSON.stringify(filtersArray)));
    }, 5000);
  };

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
  saveButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default FiltersScreen;