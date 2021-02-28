import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import Anim from '@/components/Anim/Anim';
import Space from '@/components/Space';
import Text from '@/components/Text';

const ColorBoxesDetails: React.FC = () => {
  const route = useRoute();
  const { params } = route;
  console.log({ route });
  const { color, text, image } = params;
  const [boxVisible, setBoxVisible] = useState(false);
  return (
    <View>
      <View>
        <Image
          resizeMode="cover"
          style={{
            width: '100%',
            height: 400,
          }}
          source={image}
        />
      </View>
      <Space mt="m" />
      <TouchableOpacity style={{ height: 50 }} onPress={() => setBoxVisible((v) => !v)}>
        <Text>Open</Text>
      </TouchableOpacity>
      <Anim onMount delay={200}>
        <View style={{ backgroundColor: color, width: '100%', height: 200 }} />
      </Anim>
      <Text>elo</Text>
    </View>
  );
};

export default ColorBoxesDetails;
