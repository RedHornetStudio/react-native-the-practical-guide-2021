import { StyleSheet } from 'react-native';

import colors from '../constants/colors';

const sharedStyles = StyleSheet.create({
  menuButton: {
    marginRight: 30,
  },
});

export const defaultHeaderStyles = {
  headerStyle: {
    backgroundColor: colors.primaryColor,
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
}

export default sharedStyles;
