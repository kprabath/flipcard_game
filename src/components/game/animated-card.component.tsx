/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';

import {
  addToMatchIds,
  incrementTotalClicks,
  setSelectedItem,
} from '../../actions/card.actions';
import useCardFlipper from '../../hooks/card-flipper.hook';
import {CardOpenStaus} from '../../library/enums';
import {Reducers} from '../../library/types';
import {getScaleNumber} from '../../library/utils';

import colors from '../../theme/colors';

import Card from '../card/card.component';

type IProps = {
  text: string | number;
  id: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  cardStyle: {
    padding: getScaleNumber(5),
    flexDirection: 'row',
  },
  innerCard: {
    backgroundColor: colors.primaryColor,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBorder: {
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    transform: [{scaleX: -1}],
  },
  text: {
    fontWeight: '600',
    fontSize: getScaleNumber(20),
    color: colors.blackColor1,
  },
  whiteText: {
    color: colors.white,
  },
});

const GameCard = ({text, id, containerStyle}: IProps) => {
  const dispatch = useDispatch();

  const cardOpenStatus = useRef<CardOpenStaus>(CardOpenStaus.CLOSED);
  const {
    animation,
    rotation,
    scale,
    frontCardOpacity: opacity2,
    backCardOpacity: opacity1,
  } = useCardFlipper();
  const totalCount = useSelector(
    (state: Reducers) => state.cardReducer.totalClicks,
  );
  const {prevItem, currentItem} = useSelector((state: Reducers) => ({
    prevItem: state.cardReducer.previousItem,
    currentItem: state.cardReducer.currentItem,
  }));

  const closeCard = () =>
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    });

  useEffect(() => {
    // close card once user has reset the state
    if (totalCount === 0 && cardOpenStatus.current === CardOpenStaus.OPENED) {
      closeCard().start(() => (cardOpenStatus.current = CardOpenStaus.CLOSED));
      return;
    }
    // check if number of steps are even
    if (totalCount !== 0 && totalCount % 2 === 0) {
      const hasId = id === prevItem.id || currentItem.id === id;
      if (currentItem.value === prevItem.value && hasId) {
        dispatch(addToMatchIds({matchedIds: id}));
        return;
      } else if (hasId) {
        Animated.sequence([Animated.delay(1000), closeCard()]).start(() => {
          cardOpenStatus.current = CardOpenStaus.CLOSED;
        });
      }
    }
  }, [totalCount]);

  const onPress = () => {
    if (cardOpenStatus.current === CardOpenStaus.OPENED) {
      return;
    }
    cardOpenStatus.current = CardOpenStaus.OPENED;
    batch(() => {
      dispatch(incrementTotalClicks());
      dispatch(setSelectedItem({item: {id, value: text as number}}));
    });
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  return (
    <TouchableWithoutFeedback testID={id?.toString()} onPress={onPress}>
      <Animated.View
        style={{
          transform: [{rotateY: rotation}, {scale}],
        }}>
        <Card
          containerStyles={[
            styles.cardStyle,
            styles.cardBorder,
            containerStyle,
          ]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.textContainer,
              {
                opacity: opacity1,
              },
            ]}>
            <Text style={styles.text}>{text}</Text>
          </Animated.View>
          <Animated.View
            style={[styles.innerCard, styles.cardBorder, {opacity: opacity2}]}>
            <Text style={[styles.text, styles.whiteText]}>?</Text>
          </Animated.View>
        </Card>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default GameCard;
