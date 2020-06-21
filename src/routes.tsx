import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import { Image } from 'react-native';

const Logo = require('./assets/instagram.png');

import Feed from './pages/Feed';

const Stack = createStackNavigator();

const Routes: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => <Image source={Logo} />,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Stack.Screen
          name="Feed"
          component={Feed}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
