import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const CELL_SIZE = 24;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    height: CELL_SIZE,
  },
  cell: {
    height: CELL_SIZE,
  },
  column: {
    position: 'absolute',
    bottom: 0,
  },
});

const numberArray = Array.from({ length: 10 }, (_, i) => 9 - i);

const BgSliderCell = ({ number, value }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: number.value === -1 ? 0 : 1,
      transform: [
        {
          translateY: number.value * CELL_SIZE,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.cell, style]}>
      <Text style={[styles.text]}>{value}</Text>
    </Animated.View>
  );
};

const BgSliderColumn = ({ price, index, size }) => {
  const number = useDerivedValue(() => {
    const stringNumber = String(price.value).padStart(size, 'x');
    const finalNumber = stringNumber.split('')[index];
    if (finalNumber !== 'x') {
      return Number(finalNumber);
    }
    return -1;
  });
  const numberText = useDerivedValue(() => {
    return `@${number.value}`;
  });
  const reverseIndex = size - index - 1;

  const style = useAnimatedStyle(() => {
    return {
      width: number.value === -1 ? 0 : '100%',
    };
  });
  return (
    <View>
      <Animated.View style={style}>
        <Text style={[styles.text]}>
          <Text style={{ opacity: 0 }}>9</Text>
          {reverseIndex % 3 === 0 && reverseIndex !== 0 && <Text>,</Text>}
        </Text>
      </Animated.View>
      <ReText text={numberText} />
      <View style={styles.column}>
        {numberArray.map((j) => (
          <BgSliderCell key={j} value={j} number={number} />
        ))}
      </View>
    </View>
  );
};

const BgSliderPrice = ({ price, max }) => {
  const size = String(max).length;
  const sizeArray = Array.from({ length: size }, (_, i) => i);
  return (
    <View style={styles.wrapper}>
      {sizeArray.map((i) => (
        <BgSliderColumn price={price} key={i} index={i} size={size} />
      ))}
    </View>
  );
};

export default BgSliderPrice;
