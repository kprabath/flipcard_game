import {useRef} from 'react';
import {Animated} from 'react-native';

const useCardFlipper = () => {
  const animation = useRef(new Animated.Value(0));
  const rotation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const backCardOpacity = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const frontCardOpacity = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const scale = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });
  return {
    scale,
    rotation,
    frontCardOpacity,
    backCardOpacity,
    animation: animation.current,
  };
};

export default useCardFlipper;
