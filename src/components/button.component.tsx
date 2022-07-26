import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getScaleNumber} from '../library/utils';

import colors from '../theme/colors';

type IProps = {
  text?: string;
  onPress?: () => void;
  testID?: string;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    color: colors.primaryColor,
    fontSize: getScaleNumber(22),
  },
});

const Button = ({text, onPress, testID}: IProps) => (
  <TouchableOpacity style={styles.container} testID={testID} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
