import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../constants/defaultStyles';

const TitleText = props => {
  return (
    <Text style={[defaultStyles.title, props.style]}>{props.children}</Text>
  );
};

export default TitleText;