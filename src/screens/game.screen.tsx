/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {resetCards, setCards} from '../actions/card.actions';
import {Reducers} from '../library/types';
import {
  generatePairs,
  generateUniquenumberArray,
  getScaleNumber,
  shuffleElements,
} from '../library/utils';

import GameCard from '../components/game/animated-card.component';
import GreetingsComponent from '../components/game/greetings.component';
import Button from '../components/button.component';

import styles from './game.style';
import useDimension from '../hooks/dimension.hook';

const GameScreen = () => {
  const dispatch = useDispatch();

  const {bottom, top} = useSafeAreaInsets();
  const {HEIGHT, WIDTH} = useDimension();
  const [offset, setOffset] = useState(0);
  const ITEM_MARGIN = useRef(getScaleNumber(20));
  const cards = useSelector((state: Reducers) => state.cardReducer.cards);
  const totalSteps = useSelector(
    (state: Reducers) => state.cardReducer.totalClicks,
  );
  const matchedIds = useSelector(
    (state: Reducers) => state.cardReducer.matchedIds,
  );
  const hasWon = useMemo(
    () => matchedIds.length > 0 && matchedIds.length === cards.length,
    [matchedIds],
  );

  const loadCards = () => {
    dispatch(
      setCards({
        cards: shuffleElements(generatePairs(generateUniquenumberArray(6))).map(
          (el, index) => ({
            id: index,
            value: el,
          }),
        ),
      }),
    );
  };

  const onChnageLayout = (event: LayoutChangeEvent) => {
    setOffset(
      event.nativeEvent.layout.height + top + bottom + ITEM_MARGIN.current * 4,
    );
  };

  const restart = () => {
    dispatch(resetCards());
    // Wait untill all cards are closed to reshuffle
    setTimeout(() => loadCards(), 500);
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <View style={styles.header} onLayout={onChnageLayout}>
          <Button onPress={restart} text="Restart" />
          <View testID="STEPS" style={styles.text}>
            <Text style={styles.countDescriptionText}>STEPS: </Text>
            <Text style={styles.countText}>{totalSteps}</Text>
          </View>
        </View>
        <View testID="list" style={styles.cardContainer}>
          {cards.map((el, index) => (
            <GameCard
              containerStyle={{
                width:
                  WIDTH > HEIGHT
                    ? HEIGHT / 3 - ITEM_MARGIN.current
                    : WIDTH / 3 - ITEM_MARGIN.current,
                height: (HEIGHT - offset) / 4,
                marginVertical: ITEM_MARGIN.current / 2,
                marginHorizontal: ITEM_MARGIN.current / 2,
              }}
              id={el.id}
              text={el.value}
              key={index.toString()}
            />
          ))}
        </View>
        {hasWon && (
          <GreetingsComponent
            buttonText="Try another round"
            title="Congratulations!"
            subtitle={`You win this game by ${totalSteps} steps!`}
            onPress={restart}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;
