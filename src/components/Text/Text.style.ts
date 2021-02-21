import { Platform, StyleSheet, TextStyle } from 'react-native';

interface Styles {
  HEADER_XXXL: TextStyle;
  HEADER_XL: TextStyle;
  HEADER_L: TextStyle;
  HEADER_M: TextStyle;
  HEADER_S: TextStyle;
  HEADER_XS: TextStyle;
  TEXT: TextStyle;
  TEXT_XXXL: TextStyle;
  TEXT_XXL: TextStyle;
  TEXT_XL: TextStyle;
  TEXT_L: TextStyle;
  TEXT_M: TextStyle;
  TEXT_S: TextStyle;
  TEXT_XS: TextStyle;
  TEXT_XXS: TextStyle;
  TEXT_UPPERCASE: TextStyle;
  TEXT_UNDERLINE: TextStyle;
  lineThrough: TextStyle;
  center: TextStyle;
  [styleName: string]: TextStyle;
}

export default StyleSheet.create<Styles>({
  HEADER_XXXL: {
    fontSize: 42,
    lineHeight: 42,
  },
  HEADER_XL: {
    fontSize: 40,
    lineHeight: 40,
  },
  HEADER_L: {
    fontSize: 30,
    lineHeight: 35,
  },
  HEADER_M: {
    fontSize: 24,
    lineHeight: 28,
  },
  HEADER_S: {
    fontSize: 18,
    lineHeight: 22,
  },
  HEADER_XS: {
    fontSize: 12,
    lineHeight: 20,
  },
  TEXT: {
    ...(Platform.OS !== 'ios'
      ? {
          fontWeight: 'normal',
        }
      : {}),
  },
  TEXT_XXXL: {
    fontSize: 42,
  },
  TEXT_XXL: {
    fontSize: 30,
  },
  TEXT_XL: {
    fontSize: 22,
  },
  TEXT_L: {
    fontSize: 18,
    lineHeight: 22,
  },
  TEXT_M: {
    fontSize: 14,
    lineHeight: 20,
  },
  TEXT_S: {
    fontSize: 12,
  },
  TEXT_XS: {
    fontSize: 10,
  },
  TEXT_XXS: {
    fontSize: 8,
  },

  TEXT_UPPERCASE: {
    textTransform: 'uppercase',
  },
  TEXT_UNDERLINE: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  center: {
    textAlign: 'center',
  },
});
