import React, {ReactElement} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import colors from '../../theme/colors';

type IProps = {
  children: ReactElement | ReactElement[];
  containerStyles?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

const Card = ({children, containerStyles}: IProps) => (
  <View style={[styles.container, containerStyles]}>{children}</View>
);

export default Card;
