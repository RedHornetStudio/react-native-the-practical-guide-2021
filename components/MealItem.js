import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import CustomPressableOpacity from './CustomPressableOpacity';
import CustomPressableRipple from './CustomPressableRipple';
import HeaderText from './HeaderText';
import ParagraphText from './ParagraphText';

const MealItem = props => {
  let ListItem = CustomPressableOpacity;
  if(Platform.OS === 'android') ListItem = CustomPressableRipple;

  return (
    <ListItem {...props} style={styles.listItem} contentContainerStyle={styles.listItemContentContainerStyle}>
      <View style={styles.backgroundImageContainer}>
        <ImageBackground source={{ uri: props.imageUrl }} style={styles.backgroundImage}>
          <View style={styles.titleContainer}>
            <HeaderText style={styles.title} numberOfLines={1}>{props.title}</HeaderText>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.details}>
        <ParagraphText>{props.duration}m</ParagraphText>
        <ParagraphText>{props.complexity.toUpperCase()}</ParagraphText>
        <ParagraphText>{props.affordability.toUpperCase()}</ParagraphText>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  listItemContentContainerStyle: {
    height: 200,
  },
  backgroundImageContainer: {
    height: '85%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default MealItem;
