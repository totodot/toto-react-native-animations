import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

type Props = {
  onPress?: () => void;
  text?: string;
};

const BgSliderButton: React.FC<Props> = ({ onPress, text, children }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {text ? <Text>{text}</Text> : children}
    </TouchableOpacity>
  );
};

export default BgSliderButton;
