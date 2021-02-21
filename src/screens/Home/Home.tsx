import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Space from '@/components/Space';
import Text from '@/components/Text';
import { FontFamilies } from '@/types/common.types';

const Home: React.FC = () => {
  const navi = useNavigation();
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
      <TouchableOpacity onPress={() => navi.navigate('BgSlider')}>
        <Text font={FontFamilies.Montserrat}>Background Slider 🟨</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
