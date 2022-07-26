import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../library/utils';

// use this hook for orientation changes
const useDimension = () => {
  const [dimension, setDimension] = useState({
    HEIGHT: SCREEN_HEIGHT,
    WIDTH: SCREEN_WIDTH,
  });

  useEffect(() => {
    const listner = Dimensions.addEventListener('change', () => {
      setDimension({
        HEIGHT: Dimensions.get('screen').height,
        WIDTH: Dimensions.get('screen').width,
      });
    });
    return () => listner.remove();
  }, []);

  return dimension;
};

export default useDimension;
