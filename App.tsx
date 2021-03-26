import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import BgSlider from '@/screens/BgSlider/BgSlider';
import ColorBoxes from '@/screens/ColorBoxes/ColorBoxes';
import ColorBoxesDetails from '@/screens/ColorBoxesDetails/ColorBoxesDetails';
import Home from '@/screens/Home/Home';

const Stack = createSharedElementStackNavigator();

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    MontserratLight: require('@/assets/fonts/Montserrat/Montserrat-Light.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BgSlider" component={BgSlider} />
        <Stack.Screen name="ColorBoxes" component={ColorBoxes} />
        <Stack.Screen
          name="ColorBoxesDetails"
          component={ColorBoxesDetails}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
