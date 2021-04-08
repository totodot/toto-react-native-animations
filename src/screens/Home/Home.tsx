import React from 'react';
import { View } from 'react-native';

import Space from '@/components/Space';
import Text from '@/components/Text';
import { FontFamilies } from '@/types/common.types';

import HomeLink from './HomeLink';

const Home: React.FC = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Space h={100} />
      <Text uppercase header font={FontFamilies.MontserratBold} align="center">
        zrób se animki
      </Text>
      <Space h={30} />
      <HomeLink text="Animations 🐌" link="Animations" />
      <HomeLink text="Background Slider 🟨" link="BgSlider" />
      <HomeLink text="Color Boxes 🌈" link="ColorBoxes" />
    </View>
  );
};

export default Home;
