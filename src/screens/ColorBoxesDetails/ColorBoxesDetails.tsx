import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

import Anim from '@/components/Anim/Anim';
import Space from '@/components/Space';
import Text from '@/components/Text';
import { FontFamilies } from '@/types/common.types';

const HEADER_HEIGHT = 100;

const items = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
}));

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Header = ({ scrollY, text }) => {
  const navi = useNavigation();
  const isOpen = useDerivedValue(() => {
    return withTiming(scrollY.value > 240 ? 1 : 0);
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(isOpen.value, [0, 1], [-HEADER_HEIGHT, 0]),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          style,
          {
            position: 'absolute',
            zIndex: 999,
            top: 0,
            width: '100%',
            height: HEADER_HEIGHT,
            paddingTop: 40,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text uppercase size="l" font={FontFamilies.MontserratBold} color="white">
          {text}
        </Text>
      </Animated.View>
      <View style={{ position: 'absolute', top: 58, right: 20, zIndex: 1000 }}>
        <Anim onMount delay={300} duration={500} name="fadeIn">
          <TouchableOpacity onPress={() => navi.goBack()}>
            <Text animated color="white" size="m" font={FontFamilies.MontserratBold} uppercase>
              CLOSE
            </Text>
          </TouchableOpacity>
        </Anim>
      </View>
    </>
  );
};

const ColorBoxesDetails = () => {
  const route = useRoute();
  const { params } = route;
  const { text, image, id } = params;
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log({ event });
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1 }}>
      <Header scrollY={scrollY} text={text} />
      <AnimatedFlatList
        data={items}
        ListHeaderComponent={() => (
          <>
            <SharedElement id={`item.${id}.image`}>
              <Image
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: 400,
                }}
                source={image}
              />
            </SharedElement>
            <SharedElement id={`item.${id}.text`}>
              <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <Text size="l" header color="white" font={FontFamilies.MontserratBold} uppercase>
                  {text}
                </Text>
              </View>
            </SharedElement>
            <Anim onMount delay={0} duration={600} style={{ flex: 1 }} name="slideDown">
              <Space m="s">
                <Text font={FontFamilies.MontserratLight}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia numquam sint
                  sequi quasi maxime autem quia corporis explicabo inventore voluptatum!
                </Text>
                <Space mt="xs" />
                <Text font={FontFamilies.MontserratLight}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia numquam sint
                  sequi quasi maxime autem quia corporis explicabo inventore voluptatum!
                </Text>
              </Space>
            </Anim>
          </>
        )}
        numColumns={2}
        contentContainerStyle={
          {
            // padding: 10,
          }
        }
        onScroll={scrollHandler}
        renderItem={({ item, index }) => (
          <View style={{ width: '50%', padding: 10, borderRadius: 6 }}>
            <Anim onMount delay={100 * index} duration={600} style={{ flex: 1 }} name="slideDown">
              <Image
                source={image}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 6,
                }}
                resizeMode="cover"
              />
              <Text font={FontFamilies.MontserratLight}>{`${text} ${item.id}`}</Text>
              <Text font={FontFamilies.MontserratBold}>$ 100</Text>
              <Space mb="xs" />
            </Anim>
          </View>
        )}
      />
    </View>
  );
};

ColorBoxesDetails.sharedElements = (route) => {
  const { id } = route.params;
  return [
    {
      id: `item.${id}.image`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${id}.text`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default ColorBoxesDetails;
