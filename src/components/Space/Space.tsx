import React from 'react';
import { View, ViewStyle } from 'react-native';

import { SizeValues } from '@/types/common.types';

import styles from './Space.style';

type Props = {
  fw?: boolean;
  fh?: boolean;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  m?: SizeValues;
  mv?: SizeValues;
  mh?: SizeValues;
  mt?: SizeValues;
  mr?: SizeValues;
  mb?: SizeValues;
  ml?: SizeValues;
  p?: SizeValues;
  pv?: SizeValues;
  ph?: SizeValues;
  pt?: SizeValues;
  pr?: SizeValues;
  pb?: SizeValues;
  pl?: SizeValues;
  h?: number;
  w?: number;
};

// m, mv, mh, mt, mr, mb, ml, p, pv, ph, pt, pr, pb, pl
const Space: React.FC<Props> = ({ children, fw, fh, style, w, h, ...sizesProps }) => {
  const spaceStyle = Object.entries(sizesProps).reduce(
    (result, [key, value]) => [...result, value && styles[`${key}_${value}`]],
    [] as any,
  );

  return (
    <View
      style={[
        style,
        spaceStyle,
        w && { width: w },
        h && { height: h },
        fw && styles.fw,
        fh && styles.fh,
      ]}
    >
      {children}
    </View>
  );
};

Space.defaultProps = {
  style: {},
  fw: false,
  fh: false,
};

export default React.memo(Space);
