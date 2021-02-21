import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import { clamp, ReText } from 'react-native-redash';

import Space from '@/components/Space';
import Text from '@/components/Text';
import { SPACE_L } from '@/constants/sizes.constants';
import { FontFamilies } from '@/types/common.types';

import BgSliderButton from './BgSliderButton';

Animated.addWhitelistedNativeProps({ text: true });
const { width } = Dimensions.get('window');
const SLIDER_LINE_WIDTH = 1;
const SLIDER_LINE_SPACE = 6;
const KNOB_WIDTH = 40;
const KNOB_HEIGHT = 40;
const SLIDER_LINES_COUNT = Math.ceil(width / (SLIDER_LINE_WIDTH + SLIDER_LINE_SPACE)) * 2;
const LINES_ARRAY = Array.from({ length: SLIDER_LINES_COUNT }, (v, i) => i);
const MAX_TRANSLATE = width;

const MIN_VALUE = 0;
const MAX_VALUE = 10000;
const VALUE_STEP = 100;
const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fb0',
    width: 2 * width,
  },
  slider: {
    paddingVertical: 50,
    flexDirection: 'row',
    transform: [
      {
        translateX: -width,
      },
    ],
  },
  sliderLine: {
    width: SLIDER_LINE_WIDTH,
    height: 8,
    backgroundColor: 'white',
    marginRight: SLIDER_LINE_SPACE,
  },
  sliderLineGray: {
    backgroundColor: 'gray',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  knob: {
    width: KNOB_WIDTH,
    height: KNOB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 15,
    top: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    transform: [
      {
        translateX: -KNOB_WIDTH / 2,
      },
      { translateY: -KNOB_HEIGHT / 2 },
    ],
  },
  knobCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 8,
    marginTop: 4,
  },
  buttonWrapper: {
    margin: 32,
  },
  buttonPrice: {
    color: 'white',
    fontSize: 20,
    fontFamily: FontFamilies.MontserratBold,
  },
});
const updatePrice = (price, translateX) => {
  'worklet';

  let newPrice = Math.round(MIN_VALUE + (translateX / MAX_TRANSLATE) * MAX_VALUE);
  newPrice = Math.round(newPrice / VALUE_STEP) * VALUE_STEP;
  price.value = newPrice;
};
const BgSlider: React.FC = () => {
  const [donate, setDonate] = useState(0);
  const price = useSharedValue(0);
  const translateX = useSharedValue(0);
  const priceText = useDerivedValue(() => {
    const withSeparators = String(price.value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${withSeparators}`;
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, MAX_TRANSLATE);
      updatePrice(price, translateX.value);
    },
    onEnd: () => {
      runOnJS(setDonate)(price.value);
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const bgStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -2 * width + translateX.value }],
    };
  });

  const onSubmit = () => {
    console.log({ donate, price: price.value });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Animated.View style={[styles.bg, bgStyles]} />
      <Space mh="l">
        <Image source={require('@/assets/images/forest.jpg')} style={styles.image} />
      </Space>
      <Space mt="l" />
      <Space mh="l">
        <Text size="l" font={FontFamilies.MontserratBold}>
          Donate
        </Text>
        <ReText
          style={{ fontFamily: FontFamilies.MontserratBold, fontSize: 32 }}
          text={priceText}
        />
        <Text size="l" font={FontFamilies.Montserrat}>
          to help this{' '}
          <Text size="l" font={FontFamilies.MontserratBold}>
            Rainforest
          </Text>{' '}
          recovery
        </Text>
      </Space>
      <View>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={style}>
            <View style={styles.knob}>
              <View style={styles.knobCircle} />
            </View>
            <View style={styles.slider}>
              {LINES_ARRAY.map((i) => (
                <View
                  key={i}
                  style={[styles.sliderLine, i / SLIDER_LINES_COUNT > 0.5 && styles.sliderLineGray]}
                />
              ))}
            </View>
            <View />
          </Animated.View>
        </PanGestureHandler>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: SPACE_L,
          }}
        >
          <Text>${MIN_VALUE}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: SPACE_L,
          }}
        >
          <Text>${MAX_VALUE}</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <BgSliderButton onPress={onSubmit}>
          <View style={styles.buttonContent}>
            <Text font={FontFamilies.Montserrat} style={styles.buttonLabel}>
              DONATE
            </Text>
            <ReText style={styles.buttonPrice} text={priceText} />
          </View>
        </BgSliderButton>
      </View>
    </View>
  );
};

export default BgSlider;
