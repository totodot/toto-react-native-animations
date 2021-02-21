import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import COLORS from '@/constants/colors.constants';
import { FontFamilies } from '@/types/common.types';

import styles from './Text.style';

type Props = {
  id?: string;
  children?: React.ReactNode;
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  align?: 'left' | 'right' | 'center';
  uppercase?: boolean;
  header?: boolean;
  underline?: boolean;
  style?: StyleProp<TextStyle>;
  color?: string;
  lineThrough?: boolean;
  center?: boolean;
  animated?: boolean;
  font?: FontFamilies;
  [x: string]: any;
};

const CustomText: React.FC<Props> = ({
  size = 'm',
  uppercase = false,
  style = {},
  color = COLORS.BLACK,
  lineThrough = false,
  children = null,
  header = false,
  weight,
  underline = false,
  align = 'left',
  animated = false,
  font = null,
  ...rest
}) => {
  const textStyles = [
    styles.TEXT,
    styles[`${header ? 'HEADER' : 'TEXT'}_${size.toUpperCase()}`],
    weight && styles[`TEXT_${weight.toUpperCase()}`],
    lineThrough && styles.lineThrough,
    uppercase && styles.TEXT_UPPERCASE,
    underline && styles.TEXT_UNDERLINE,
    {
      color: color || '',
      textAlign: align,
    },
    font && {
      fontFamily: font,
    },
    style,
  ];

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent style={textStyles} {...rest}>
      {children}
    </TextComponent>
  );
};

export default React.memo(CustomText);
