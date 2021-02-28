import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

import Anim from '@/components/Anim/Anim';
import Space from '@/components/Space';
import Text from '@/components/Text';
import COLORS from '@/constants/colors.constants';
import { FontFamilies } from '@/types/common.types';

const items = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
}));

const Header = () => {
  return (
    <View>
      <Text>toto</Text>
    </View>
  );
};

const ColorBoxesDetails: React.FC = () => {
  const route = useRoute();
  const navi = useNavigation();
  const { params } = route;
  console.log({ route });
  const { color, text, image, id } = params;
  const [boxVisible, setBoxVisible] = useState(false);
  console.log(`item.${id}.image`);
  return (
    <View style={{ flex: 1 }}>
      <View>
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
        <View style={{ position: 'absolute', top: 80, right: 20 }}>
          <Anim onMount delay={200} duration={500} name="fadeIn">
            <TouchableOpacity onPress={() => navi.goBack()}>
              <Text size="m" color="white" font={FontFamilies.MontserratBold} uppercase>
                CLOSE
              </Text>
            </TouchableOpacity>
          </Anim>
        </View>
        <SharedElement id={`item.${id}.text`}>
          <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <Text size="l" header color="white" font={FontFamilies.MontserratBold} uppercase>
              {text}
            </Text>
          </View>
        </SharedElement>
      </View>
      <Space mt="m" />

      <TouchableOpacity style={{ height: 50 }} onPress={() => setBoxVisible((v) => !v)}>
        <Text>Open</Text>
      </TouchableOpacity>
      <Anim onMount delay={100} duration={600} style={{ flex: 1 }} name="slideDown">
        <FlatList
          data={items}
          ListHeaderComponent={Header}
          numColumns={2}
          contentContainerStyle={{
            padding: 10,
          }}
          renderItem={({ item }) => (
            <View style={{ width: '50%', padding: 10, borderRadius: 6 }}>
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
            </View>
          )}
        />
      </Anim>
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
