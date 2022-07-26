import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {getScaleNumber} from '../../library/utils';

import colors from '../../theme/colors';
import Button from '../button.component';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: getScaleNumber(22),
    marginBottom: 5,
  },
  alertBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  header: {
    paddingVertical: getScaleNumber(20),
    alignItems: 'center',
    paddingHorizontal: getScaleNumber(50),
  },
  footer: {
    paddingVertical: getScaleNumber(5),
    borderTopColor: colors.lightgray,
    borderTopWidth: 1,
  },
  subtitle: {
    fontSize: getScaleNumber(11),
  },
});

type IProps = {
  title?: string;
  subtitle?: string;
  buttonText: string;
  onPress?: () => void;
};

const GreetingsComponent = ({title, subtitle, buttonText, onPress}: IProps) => {
  const sclae = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.timing(sclae.current, {toValue: 1.2, useNativeDriver: true}),
      Animated.timing(sclae.current, {toValue: 1, useNativeDriver: true}),
    ]).start();
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View style={[{transform: [{scale: sclae.current}]}]}>
        <View style={styles.alertBox}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.footer}>
            <Button onPress={onPress} text={buttonText} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default GreetingsComponent;
