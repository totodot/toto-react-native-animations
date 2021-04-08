import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Space from '@/components/Space';
import Text from '@/components/Text';
import { FontFamilies } from '@/types/common.types';

type Props = {
  text: string;
  link: string;
};

const HomeLink: React.FC<Props> = ({ text, link }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(link)}>
      <Space mv="xs">
        <Text font={FontFamilies.Montserrat}>{text}</Text>
      </Space>
    </TouchableOpacity>
  );
};

export default HomeLink;
