import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../constants/defaultStyles';

const BodyText = props => {
  return (
    <Text style={[defaultStyles.bodyText, props.style]}>{props.children}</Text>
  );
};

export default BodyText;